import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';


// استخدم مفتاح النشر من البيئة
const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

console.log(stripeKey);

if (!stripeKey) {
  console.error('Stripe publishable key is not defined. Please set it in your .env file.');
}

const stripePromise = loadStripe(stripeKey);

const CheckoutForm = () => {
  const { cart, token, setCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      // 1. إنشاء الطلب أولاً في السيرفر
      const orderRes = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          total: totalAmount,
        }),
      });

      const orderData = await orderRes.json();
      const orderId = orderData.order._id;

      // 2. إنشاء نية الدفع (paymentIntent)
      const res = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { clientSecret } = await res.json();

      // 3. تنفيذ الدفع
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          // 4. تأكيد الدفع في السيرفر وربطه بالطلب
          const confirmRes = await fetch('http://localhost:5000/api/payment/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId: paymentResult.paymentIntent.id,
              orderId,
            }),
          });

          if (!confirmRes.ok) {
            const errorData = await confirmRes.json();
            setError(errorData.message || 'Error confirming payment');
            setProcessing(false);
            return;
          }

          // نجاح الدفع
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          setCart([]); // تنظيف السلة
          alert('تم الدفع وتأكيد الطلب بنجاح!');
        }
      }
    } catch (err) {
      setError('Payment failed: ' + err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing || succeeded}>
        {processing ? '...جاري المعالجة' : 'ادفع الآن'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {succeeded && <div style={{ color: 'green', marginTop: '10px' }}>✅ تم الدفع بنجاح!</div>}
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
