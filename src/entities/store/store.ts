import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../slices/header/headerSlice";

const store = configureStore({
  reducer: {
    header: headerSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
