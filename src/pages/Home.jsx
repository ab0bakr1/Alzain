import React from 'react';
import Header from '../Component/header/Header';
import Hero from '../Component/Hero/Hero';
import Product from '../Component/Product/Products';
import Testimonials from '../Component/Testimonials/Testimonials';
import Contact from '../Component/Contact/Contact';
import Footer from '../Component/Footer/Footer';
import { CartProvider } from '../context/CartContext';

const Home = () => {
  return (
    <CartProvider>
      <Header />
      <Hero />
      <Product />
      <Testimonials />
      <Contact />
      <Footer />
    </CartProvider>
  );
};

export default Home;
