import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import Payment from '../Payment/Payment';

const Cart = () => {
  const { cart, setCart, addToCart, token, removeFromCart } = useContext(CartContext);

  const cartquantity = () => {
    let count = 0;
    for (const item of cart) {
      count += Number(item.quantity) || 0;
    }
    return count;
  };

  const plusQuanntity = async (productId) => {
    try {
      console.log('plusQuanntity called for productId:', productId);
      const item = cart.find(item => item.productId === productId);
      const newQuantity = (item?.quantity || 0) + 1;
      console.log('Updating quantity to:', newQuantity);
      const response = await fetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      const updatedCart = await response.json();
      console.log('Updated cart received:', updatedCart);
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

  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);

  const minusQuanntity = async (productId) => {
    try {
      const item = cart.find(item => item.productId === productId);
      const newQuantity = (item?.quantity || 0) - 1;
      if (newQuantity < 1) {
        await removeFromCart(productId);
        return;
      }
      const response = await fetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
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
    <section className='py-5 mt-5'>
      <Container>
        <Row xl={2} lg={2} md={2} sm={1}>
          <Col xl={8} lg={8} md={8} sm={12}>
            <div className="cart-title d-flex justify-content-between">
              <h6>السلة</h6>
              <h6>المنتجات {cartquantity()}</h6>
            </div>
            <hr />
            <table className="cart-body w-100" style={{ borderSpacing: '0 20px', borderCollapse: 'separate'}}>
              <thead>
                <tr>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>المجموع</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const key = typeof item.productId === 'object' ? item.productId._id : item.productId;
                  return (
                    <tr key={key} className='py-5'>
                      <td className='d-flex align-items-center'>
                        <img src={item.image} alt={item.name} height={80} width={100} />
                        <div className="">
                          <p>{item.name}</p>
                          <p>{item.description}</p>
                        </div>
                      </td>
                      <td className='px-2'>{item.price} ر.س</td>
                      <td className='px-2'>
                          <span onClick={() => minusQuanntity(item.productId)}>−</span>
                          {item.quantity}
                          <span onClick={() => plusQuanntity(item.productId)}>+</span>
                      </td>
                      <td className='px-2'>{item.price * item.quantity} ر.س</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col xl={4} lg={4} md={4} sm={12} className=''>
            <div className="cart-title">
              <h6>معلومات الدفع</h6>
            </div>
            <hr />
            <div className="cart-total d-flex justify-content-between">
              <p>المنتجات {cartquantity()}</p>
              <p>{total} ر.س</p>
            </div>
            <div className="">
              <Payment />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
