import React from 'react'
import Header from '../Component/header/Header'

import { CartProvider } from '../context/CartContext';
import Cart from '../Component/Cart/Cart';
import Footer from '../Component/Footer/Footer';


const PageCart = () => {
  return (
    <>
     <CartProvider >
        <Header />
        <Cart />
        <Footer />
     </CartProvider>

    </>
  )
}

export default PageCart