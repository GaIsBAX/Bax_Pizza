export type Pizza = {
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

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type FetchPizzasArgs = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: number;
  };

