import React from 'react';
import Login from '../Component/Register/Login';
import Footer from '../Component/Footer/Footer';
import Header from '../Component/header/Header';
import { CartProvider } from '../context/CartContext';

const PageLogin = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <Login />
        <Footer />
      </CartProvider>
    </>
  );
};

export default PageLogin;
