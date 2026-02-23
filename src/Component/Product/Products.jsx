import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';
import './Products.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://alzain.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const isInCart = (productId) => {
    return cart.some((item) => item.productId === productId);
  };

  return (
    <section className="products-section py-5">
      <Container>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center products-title"
        >
          منتجات الزين المختارة
        </motion.h3>

        <Row className="justify-content-center g-5">
          {products.map((product, index) => (
            <Col key={product._id} xs={12} md={6} lg={4} className="d-flex justify-content-center">
              <motion.div 
                className="cardProduct"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div id="cardnewfilter">
                  <p className="m-0">جديد</p>
                </div>
                
                <div id="cardbrightfilter"></div>

                <div id="cardtop">
                  <img src={product.images[0].image} alt={product.name} className="img-fluid" />
                </div>

                <div id="cardbottom">
                  <div>
                    <h5 id="cardbottomtitle">{product.name}</h5>
                    <p id="cardbottomdesc">{product.description}</p>
                  </div>
                  
                  <div id="cardbottombutton">
                    <p id="cardbottomprice">{product.price} ر.ي</p>
                    <button 
                      className={`btn-add-cart ${isInCart(product._id) ? 'btn-in-cart' : ''}`}
                      onClick={() => addToCart(product._id)}
                    >
                      {isInCart(product._id) ? 'إزالة' : 'إضافة للطلب'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Products;