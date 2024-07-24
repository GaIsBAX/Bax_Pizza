import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

export type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { sortBy, order, category, search, currentPage } = params;
    const res = await axios.get<Pizza[]>(
      `https://6682d4e84102471fa4c865b3.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data as Pizza[];
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

// export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
