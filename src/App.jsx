import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { createContext, useState } from "react";

export const SearchContex = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContex.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContex.Provider>
    </div>
  );
}

export default App;
