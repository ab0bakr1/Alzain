import React from 'react'
import Register from '../Component/Register/Register'
import Header from '../Component/header/Header'
import Footer from '../Component/Footer/Footer'
import { CartProvider } from '../context/CartContext';


const PageRegister = () => {
  return (
    <CartProvider>
      <section style={{minHeight:'100vh', display: 'flex',flexDirection:'column',justifyContent:'flex-end'}}>
        <Header />
        <Register />
        <Footer />
      </section>
    </CartProvider>
  )
}

export default PageRegister