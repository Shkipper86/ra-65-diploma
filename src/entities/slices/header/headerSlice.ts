// редьюсер для header

import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { HeaderStateTypes } from "./headerTypes";

const initialState: HeaderStateTypes = {
  search: {
    searchStatusInHeader: false,
    searchString: "",
  },
};

const sliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const headerSlice = sliceWithThunk({
  name: "header-entities",
  initialState,
  reducers: (create) => ({
    changeSearchStatusInHeader: create.reducer((state) => {
      state.search.searchStatusInHeader === true
        ? (state.search.searchStatusInHeader = false)
        : (state.search.searchStatusInHeader = true);
    }),
    changeSearchString: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.search.searchString = action.payload;
      }
    ),
  }),
});

export const { changeSearchStatusInHeader, changeSearchString } =
  headerSlice.actions;

export default headerSlice.reducer;
