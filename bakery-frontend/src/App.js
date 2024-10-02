// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddProductPage from './components/AddProductPage';
import ProductCart from './components/ProductCart';
import CheckoutPage from './components/CheckoutPage';
import AdminOrderPage from './components/AdminOrderPage';
import Header from './components/Header';
import Login from './components/Login';

const App = () => {
  const [cart, setCart] = useState([]); // ตะกร้าสินค้า

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products" element={<ProductCart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
        <Route path="/adminorders" element={<AdminOrderPage />} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default App;

