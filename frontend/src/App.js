import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import WebFont from "webfontloader";
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js";
import Search from './component/Product/Search';
import LoginSignUp from './component/layout/User/LoginSignUp';
import store from "./store";
import Cart from './component/Cart/Cart';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/layout/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <ErrorBoundary fallback="There is an error">
        <ThemeProvider theme={theme}>
          <Suspense fallback={null}>
            <BrowserRouter>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />

                <Route path="/search" element={<Search />} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/account' element={<Profile />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/order/confirm" element={<ConfirmOrder />} />
                </Route>

                <Route path='/login' element={<LoginSignUp />} />

                <Route path="/cart" element={<Cart />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default App