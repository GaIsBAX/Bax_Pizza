import { useContext } from "react";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { useEffect, useState } from "react";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SearchContex } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.js";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContex);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&title=${searchValue}` : "";
    axios
      .get(
        `https://6682d4e84102471fa4c865b3.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const onSortCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const sceletons = [...new Array(6)].map((_, index) => (
    <Sceleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onSortCategory={onSortCategory} value={categoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
