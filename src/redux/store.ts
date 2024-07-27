import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filter/filterSlice";
import cart from "./slices/cart/cartSlice";
import pizzas from "./slices/pizza/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizzas },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
