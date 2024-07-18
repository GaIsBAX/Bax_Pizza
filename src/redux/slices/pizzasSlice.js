import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const res = await axios.get(
      `https://6682d4e84102471fa4c865b3.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizzas;

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
