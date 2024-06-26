import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { InitialStateTypes } from "./productsTypes";

const initialState: InitialStateTypes = {  
  fetchStatus: false,
  prodictPropertiesFetchStatus: false,
  topProductList: [],
  category: 11,
  offset: 0,
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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/top-sales`);

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
          state.fetchTopError = false
          state.fetchStatus = true;
        },
        fulfilled: (state, action) => {
          state.topProductList = action.payload;
        },
        rejected: (state) => {
          state.fetchTopError = true
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
