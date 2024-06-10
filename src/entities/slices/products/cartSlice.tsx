import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { CartItemTypes, CartTypes } from "./productsTypes";

const initialState: CartTypes = {
  fetchStatus: false,
  cartKeys: [],
};

const sliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const cartSlice = sliceWithThunk({
  name: "cart-slice",
  initialState,
  reducers: (create) => ({
    getCartKeys: create.reducer((state) => {
      state.cartKeys = Object.keys(localStorage);
    }),
    getCartItems: create.reducer((state) => {
      state.cart = state.cartKeys.map((key) => {
        const item: CartItemTypes = JSON.parse(localStorage.getItem(key)!);
        return {
          id: Number(key),
          title: item.title,
          size: item.size,
          quantity: item.quantity,
          priceTitle: `${item.price} руб.`,
          price: item.price,
          totalPrice: Number(item.price * Number(item.quantity)),
        };
      });
      state.checkPriceStatus = true
    }),
    getPrice: create.asyncThunk(
      async (id: Number, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/items/${id}`
          );

          if (!response.ok) {
            return rejectWithValue("Loading error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.fetchStatus = true;
        },
        fulfilled: (state, action) => {
          const item = state.cart!.findIndex(cart => cart.id === action.meta.arg)
          state.cart![item].price != action.payload.price &&
            (
              state.cart![item] = {
                ...state.cart![item],
                price: action.payload.price,
                priceTitle: `${state.cart![item].priceTitle} -> ${action.payload.price} руб.`,
                totalPrice: Number(action.payload.price * state.cart![item].quantity)
              },
              state.equalityPrice = true
            )
        },
        rejected: (state) => {
          state.fetchCartError = true;
        },
        settled: (state) => {
          state.fetchStatus = false;
        },
      }
    ),
    deleteCartItems: create.reducer((state, action: PayloadAction<number>) => {
      localStorage.removeItem(`${action.payload}`);
      state.cart = state.cart?.filter((cart) => cart.id != action.payload);
      state.cartKeys = state.cartKeys.filter(
        (key) => key != `${action.payload}`
      );
    }),
    postOrder: create.asyncThunk(
      async (body: string, { rejectWithValue }) => {
        const queryOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        };
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/order`, queryOptions
          );

          if (!response.ok) {
            return rejectWithValue("Order error!");
          }

          return console.log('ok!');
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.fetchStatus = true
          state.orderSendStatus = false
          state.fetchCartError = false
        },
        fulfilled: (state) => {
          state.cartKeys = [];
          state.cart = [];
          localStorage.clear();
          state.orderSendStatus = true
        },
        rejected: (state) => {
          state.fetchCartError = true
        },
        settled: (state) => {
          state.fetchStatus = false
        }
      }
    ),
    removeOrderStatus: create.reducer((state) => {
      state.orderSendStatus = false
    })
  }),
});

export const { getCartItems, getCartKeys, deleteCartItems, postOrder, getPrice, removeOrderStatus } =
  cartSlice.actions;
export default cartSlice.reducer;
