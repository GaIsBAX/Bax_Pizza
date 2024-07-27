import { RootState } from "../../store";

export const selectFilter = (state: RootState) => state.filter;
export const selecSort = (state: RootState) => state.filter.sort;
