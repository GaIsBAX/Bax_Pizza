import { useContext, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { useEffect, useState } from "react";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SearchContex } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice.js";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = useContext(SearchContex);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSortCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
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
  };

  // Если был первый рендер то проверяем url параметры и сохраняем их в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер то запрашиваем все пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
