import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { IQueryParams, InitialStateTypes } from "./productsTypes";

const initialState: InitialStateTypes = {
  fetchStatus: false,
  prodictPropertiesFetchStatus: false,
  category: 11,
  offset: 0,
  offsetMorestatus: true,
};

const sliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const getParams = (queryParam: IQueryParams): string => {
  let categoryId: string = ``;
  queryParam.category != 11 &&
    (categoryId = `&categoryId=${queryParam.category}`);
  let offset = ``;
  queryParam.offset > 0 && (offset = `offset=${queryParam.offset}`);
  let searchString = ``;
  queryParam.searchString != "" &&
    (searchString = `&q=${queryParam.searchString}`);
  const qParams = `${offset}${categoryId}${searchString}`;
  return qParams;
};

const catalogSlice = sliceWithThunk({
  name: "catalog",
  initialState,
  reducers: (create) => ({
    getCategories: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);

          if (!response.ok) {
            return rejectWithValue("Loading error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        fulfilled: (state, action) => {
          state.categories = action.payload;
          state.categories?.unshift({
            id: 11,
            title: "Все",
          });
          state.category = 11;
        },
        rejected: () => {
          console.log("loading error!");
        },
      }
    ),
    getCatalog: create.asyncThunk(
      async (queryParam: IQueryParams, { rejectWithValue }) => {
        const params = getParams(queryParam);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/items?${params}`
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
          state.fetchCatalogError = false;
          state.fetchStatus = true;
        },
        fulfilled: (state, action) => {
          state.productList = action.payload;
          state.category = action.meta.arg.category;
          state.offset = 0;
          action.payload.length < 6
            ? (state.offsetMorestatus = false)
            : (state.offsetMorestatus = true);
        },
        rejected: (state) => {
          state.fetchCatalogError = true;
        },
        settled: (state) => {
          state.fetchStatus = false;
        },
      }
    ),
    loadNextItems: create.asyncThunk(
      async (queryParam: IQueryParams, { rejectWithValue }) => {
        const params = getParams(queryParam);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/items?${params}`
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
          for (let item of action.payload) {
            state.productList?.push(item);
          }
          state.offset = action.meta.arg.offset;
          action.payload.length < 6 && (state.offsetMorestatus = false);
        },
        rejected: () => {
          console.log("loading error!");
        },
        settled: (state) => {
          state.fetchStatus = false;
        },
      }
    ),
    searchProducts: create.asyncThunk(
      async (queryParam: IQueryParams, { rejectWithValue }) => {
        const params = getParams(queryParam);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/items?${params}`
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
          state.productList = action.payload;
          state.offset = action.meta.arg.offset;
          action.payload.length < 6 && (state.offsetMorestatus = false);
        },
        rejected: () => {
          console.log("loading error!");
        },
        settled: (state) => {
          state.fetchStatus = false;
        },
      }
    ),
    getItemProperties: create.asyncThunk(
      async (itemId: string, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/items/${itemId}`
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
          state.product = action.payload
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

export const { getCategories, getCatalog, loadNextItems, searchProducts, getItemProperties } =
  catalogSlice.actions;
export default catalogSlice.reducer;
