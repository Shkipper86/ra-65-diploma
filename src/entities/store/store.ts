import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../slices/header/headerSlice";
import topSalesSlice from "../slices/products/topSalesSlice";

const store = configureStore({
  reducer: {
    header: headerSlice,
    topSales: topSalesSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
