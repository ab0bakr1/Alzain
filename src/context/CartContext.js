import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);
  const [quantity, setQuantity] = useState(1);

  localStorage.setItem('quantity', quantity); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const newCart = data.items?.map((item) => {
          const product = typeof item.productId === 'object' ? item.productId : {};
          return {
            productId: product._id || item.productId,
            name: product.name || 'منتج غير معروف',
            description: product.description || '',
            image: product.images[0].image || '',
            price: product.price || 0,
            quantity: item.quantity ?? 1,
          };
        }) || [];
        setCart(newCart);
      })
        .catch(() => setCart([]));
    }
  }, [token]);

  const addToCart = async (productId) => {
    if (!token) {
      alert('الرجاء تسجيل الدخول أولاً لإضافة المنتجات إلى السلة.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error('فشل في تحديث السلة.');
      }

      const updatedCart = await res.json();

      // تحويل السلة إلى مصفوفة موحدة
      const newCart = updatedCart.items?.map((item) => {
        const product = typeof item.productId === 'object' ? item.productId : {};
        return {
          productId: product._id || item.productId,
          name: product.name || 'منتج غير معروف',
          description: product.description || '',
          image: product.images ? (product.images[0]?.image || '') : (product.image || ''),
          price: product.price || 0,
          quantity: item.quantity ?? 1,
        };
      }) || [];

      setCart(newCart);
    } catch (error) {
      alert(error.message);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      alert('الرجاء تسجيل الدخول أولاً لإزالة المنتجات من السلة.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error('فشل في إزالة المنتج من السلة.');
      }

      const updatedCart = await res.json();

      const newCart = updatedCart.items?.map((item) => {
        const product = typeof item.productId === 'object' ? item.productId : {};
        return {
          productId: product._id || item.productId,
          name: product.name || 'منتج غير معروف',
          description: product.description || '',
          image: product.images ? (product.images[0]?.image || '') : (product.image || ''),
          price: product.price || 0,
          quantity: item.quantity ?? 1,
        };
      }) || [];

      setCart(newCart);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <CartContext.Provider value={{ cart, setCart, token, setToken, addToCart, quantity, setQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
