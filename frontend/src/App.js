import React, { Suspense, useEffect, useState } from 'react'
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
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      <ErrorBoundary fallback="There is an error">
        <ThemeProvider theme={theme}>
          <Suspense fallback={null}>
            <BrowserRouter>
              <Header />
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
                  <Route path="/success" element={<OrderSuccess />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>

                <Route path='/login' element={<LoginSignUp />} />
              </Routes>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Routes>
                    <Route element={<ProtectedRoute />}>
                      <Route path="/process/payment" element={<Payment />} />
                    </Route>
                  </Routes>
                </Elements>
              )
              }
              <Footer />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default App