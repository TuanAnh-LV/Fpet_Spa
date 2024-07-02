// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Product from "./pages/Product/Product";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import CheckEmail from "./pages/CheckEmail/CheckEmail";
import "react-toastify/dist/ReactToastify.css";
import Service from "./pages/Service/Service";
import ContactUs from "./pages/ContactUs/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";
import Navlink from "./components/Navlink/Navlink";
import BookingService from "./pages/Service/BookingService";
import Profile from "./pages/Profile/Profile";
import DashBoard from "./pages/DashBoard/DashBoard";
import Checkout from "./components/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const routes = [
      "/",
      "/service",
      "/about-us",
      "/contact-us",
      "/cart",
      "/order",
      "/login",
      "/register",
      "/product",
      "/booking",
      "/profile",
      "/checkout",
      "/productdisplay/:productName",
      "/confirm-email",
      "/check-email",
      "/dashboard",
    ];

    const isMatched = routes.some((route) => matchPath(route, location.pathname));
    setShowNavbarAndFooter(isMatched && !location.pathname.includes("/dashboard"));
  }, [location.pathname]);

  return (
    <>
      <div className="app">
        {showNavbarAndFooter && (
          <>
            <Navlink />
            <Navbar />
          </>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/booking" element={<BookingService />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/productdisplay/:productName"
            element={<ProductDisplay />}
          />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />

          {/* DashBoard */}
          <Route path="/dashboard" element={<DashBoard />} />

          {/* Đường dẫn không khớp */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showNavbarAndFooter && (
        <div className="bg-gray-700">
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;