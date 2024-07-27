import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzasArgs, Pizza } from "./types";
import axios from "axios";

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
