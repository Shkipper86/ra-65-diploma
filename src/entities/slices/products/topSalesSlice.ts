import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { InitialState } from "./productsTypes";

const initialState: InitialState = {
  fetchStatus: false,
  productList: [],
};

const sliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const topSalesSlice = sliceWithThunk({
  name: "top-sales",
  initialState,
  reducers: (create) => ({
    getTopSalesList: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch(`http://localhost:7070/api/top-sales`);

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
          state.productList = action.payload;
        },
        rejected: () => {
          console.log("loading error!");
        },
        settled: (state) => {
          state.fetchStatus = false;
        },
      }
    ),
  }),
});

export const { getTopSalesList } = topSalesSlice.actions;

export default topSalesSlice.reducer;
