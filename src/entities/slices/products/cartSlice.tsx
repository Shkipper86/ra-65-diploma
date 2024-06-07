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
          price: item.price,
          totalPrice: Number(item.price * Number(item.quantity)),
        };
      });
    }),
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
  }),
});

export const { getCartItems, getCartKeys, deleteCartItems, postOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
