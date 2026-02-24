import React, { useContext, useState, useEffect } from 'react';
import { Col, Container, Row, Badge } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import Payment from '../Payment/Payment';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

const Cart = () => {
  const { cart, setCart, token, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);

  const cartquantity = () => cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0);

  const updateQty = async (productId, newQty) => {
    if (newQty < 1) {
      await removeFromCart(productId);
      return;
    }
    try {
      const response = await fetch('https://alzain.onrender.com/api/cart/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      if (response.ok) {
        const updatedData = await response.json();
        const normalizedCart = updatedData.items?.map((item) => {
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
        setCart(normalizedCart);
      }
    } catch (error) {
      console.error("Error updating qty:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="cart-empty">
        <FontAwesomeIcon icon={faShoppingBag} size="4x" className="mb-4 text-muted" />
        <h3>سلة المشتريات فارغة</h3>
        <p>ابدأ بإضافة بعض المنتجات الرائعة لسلتك الآن!</p>
        <a href="#products" className="btn btn-success px-4 py-2 mt-3" style={{backgroundColor: '#0C574C'}}>تسوق الآن</a>
      </Container>
    );
  }

  return (
    <section className='cart-section py-5 mt-5' dir="rtl">
      <Container>
        <div className="d-flex align-items-center mb-5 mt-4">
          <h2 className="products-title mb-0 ms-3">سلة التسوق</h2>
          <Badge bg="dark" className="rounded-pill px-3 py-2">{cartquantity()} منتجات</Badge>
        </div>

        <Row className="gy-4">
          <Col lg={8}>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  layout
                  key={item.productId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="cart-card-item"
                >
                  <Row className="align-items-center">
                    <Col xs={4} md={2}>
                      <img src={item.image} alt={item.name} className="img-fluid product-img-cart" />
                    </Col>
                    <Col xs={8} md={4} className="product-info-cart">
                      <h5>{item.name}</h5>
                      <p className="text-truncate">{item.description}</p>
                      <h6 className="mt-2 text-dark fw-bold d-md-none">{item.price} ر.س</h6>
                    </Col>
                    <Col xs={6} md={3} className="mt-3 mt-md-0 d-flex justify-content-center">
                      <div className="quantity-control">
                        <span className="qty-btn" onClick={() => updateQty(item.productId, item.quantity - 1)}>
                          <FontAwesomeIcon icon={item.quantity === 1 ? faTrash : faMinus} size="xs" />
                        </span>
                        <span className="qty-number">{item.quantity}</span>
                        <span className="qty-btn" onClick={() => updateQty(item.productId, item.quantity + 1)}>
                          <FontAwesomeIcon icon={faPlus} size="xs" />
                        </span>
                      </div>
                    </Col>
                    <Col xs={6} md={3} className="text-start mt-3 mt-md-0">
                      <div className="fw-bold text-dark fs-5">
                        {item.price * item.quantity} ر.س
                      </div>
                      <small className="text-muted">{item.price} ر.س للوحدة</small>
                    </Col>
                  </Row>
                </motion.div>
              ))}
            </AnimatePresence>
          </Col>

          <Col lg={4}>
            <div className="payment-summary">
              <h4 className="mb-4 fw-bold">ملخص الطلب</h4>
              <div className="summary-item">
                <span>إجمالي المنتجات</span>
                <span>{total} ر.س</span>
              </div>
              <div className="summary-item">
                <span>رسوم التوصيل</span>
                <span className="text-success fw-bold">مجاني</span>
              </div>
              <div className="summary-item total-price">
                <span>الإجمالي النهائي</span>
                <span>{total} ر.س</span>
              </div>
              
              <div className="mt-4">
                <Payment />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;