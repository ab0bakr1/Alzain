import React, { useContext, useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import Payment from '../Payment/Payment';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

const Cart = () => {
  const { cart, setCart, token, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);

  const cartquantity = () => cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
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
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (!response.ok) throw new Error('Failed to update');
      const updatedCart = await response.json();
      const normalizedCart = updatedCart.items?.map((item) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='cart-section'>
      <Container>
        <motion.div 
          className="cart-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Row className="gy-4">
            {/* جانب المنتجات */}
            <Col xl={8} lg={7}>
              <div className="cart-title d-flex justify-content-between align-items-center mb-4">
                <h6><FontAwesomeIcon icon={faShoppingBag} className="me-2" /> سلة التسوق</h6>
                <span className="badge bg-success">{cartquantity()} منتجات</span>
              </div>
              
              <div className="cart-table-container">
                <Table responsive borderless style={{ verticalAlign: 'middle' }}>
                  <thead>
                    <tr className="text-muted border-bottom">
                      <th>المنتج</th>
                      <th>السعر</th>
                      <th>الكمية</th>
                      <th>المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.tr 
                          key={item.productId} 
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="cart-item-row"
                        >
                          <td className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} width={80} height={80} className="product-img ms-3" />
                            <div>
                              <div className="fw-bold">{item.name}</div>
                              <small className="text-muted">{item.description.substring(0, 30)}...</small>
                            </div>
                          </td>
                          <td className="fw-bold">{item.price} ر.س</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                                <FontAwesomeIcon icon={faMinus} size="xs" />
                              </span>
                              <span className="fw-bold mx-2">{item.quantity}</span>
                              <span className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                                <FontAwesomeIcon icon={faPlus} size="xs" />
                              </span>
                            </div>
                          </td>
                          <td className="fw-bold text-success">
                            {item.price * item.quantity} ر.س
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </Table>
                {cart.length === 0 && (
                  <div className="text-center py-5">
                    <p className="text-muted">سلتك فارغة حالياً.. املأها بالزين!</p>
                  </div>
                )}
              </div>
            </Col>

            {/* جانب الدفع */}
            <Col xl={4} lg={5}>
              <div className="payment-sidebar">
                <h5 className="mb-4 fw-bold">ملخص الطلب</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>إجمالي المنتجات:</span>
                  <span>{cartquantity()}</span>
                </div>
                <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
                  <span className="fw-bold">المجموع الكلي:</span>
                  <span className="total-price">{total} ر.س</span>
                </div>
                <Payment />
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Cart;