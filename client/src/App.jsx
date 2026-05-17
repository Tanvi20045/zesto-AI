import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import CartDrawer from "./components/cart/CartDrawer";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OrdersPage from "./pages/OrdersPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AdminPage from "./pages/AdminPage";

function App() {
  // activeCategory lifted here so Navbar search and Categories both work
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
      />

      <CartDrawer />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/product/:id"  element={<ProductDetailPage />} />
        <Route path="/checkout"     element={<CheckoutPage />} />
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/signup"       element={<SignupPage />} />
        <Route path="/orders"       element={<OrdersPage />} />
        <Route path="/orders/:id"   element={<OrderTrackingPage />} />
        <Route path="/admin"        element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
