import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import WebFont from "webfontloader";
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js";
import Search from './component/Product/Search';
import LoginSignUp from './component/layout/User/LoginSignUp';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          <Route path="/search" element={<Search />} />

          <Route path='/login' element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App