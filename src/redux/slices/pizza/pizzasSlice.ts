import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FetchPizzasArgs, Pizza, PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
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

// export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
