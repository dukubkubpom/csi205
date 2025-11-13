import { useState, useEffect, use } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import Components from "./pages/Components";
import ForwardToHome from "./pages/ForwardToHome";
import Todos from "./pages/Todos";
import Products from "./pages/Products";
import Carts from "./pages/Carts";

import { fetchProducts } from "./data/products";

import "./App.css";
import Login from "./pages/Login/Login";

function App() {
  const [token, setToken] = useState("")
  const [role, setRole] = useState("")

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  if (token === '') {
    return (<Login setToken={setToken} setRole={setRole} />)
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken} />}>
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="components" element={<Components />} />
            <Route path="todos" element={<Todos />} />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
