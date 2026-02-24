import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCreditCard, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Payment.css';

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = () => {
  const { cart, token, setCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // تنسيق حقل Stripe ليتناسب مع ألوان الموقع
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: 'Cairo, sans-serif',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    try {
      // 1. إنشاء الطلب
      const orderRes = await fetch('https://alzain.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          products: cart.map(item => ({ productId: item.productId, quantity: item.quantity })),
          total: totalAmount,
        }),
      });
      const orderData = await orderRes.json();
      const orderId = orderData.order._id;

      // 2. جلب الـ Client Secret
      const res = await fetch('https://alzain.onrender.com/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const { clientSecret } = await res.json();

      // 3. تأكيد الدفع
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        // 4. التأكيد النهائي للسيرفر
        await fetch('https://alzain.onrender.com/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ paymentIntentId: paymentResult.paymentIntent.id, orderId }),
        });

        setSucceeded(true);
        setProcessing(false);
        setCart([]); // تفريغ السلة بعد النجاح
      }
    } catch (err) {
      setError('عذراً، فشلت العملية: ' + err.message);
      setProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <p className="small text-muted mb-3">
        <FontAwesomeIcon icon={faLock} className="me-1" /> دفع آمن ومُشفر
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="stripe-card-element">
          <CardElement options={cardElementOptions} />
        </div>

        <button className="pay-button" type="submit" disabled={!stripe || processing || succeeded || cart.length === 0}>
          {processing ? (
            <><FontAwesomeIcon icon={faSpinner} spin /> جاري المعالجة...</>
          ) : succeeded ? (
            <><FontAwesomeIcon icon={faCheckCircle} /> تم الدفع بنجاح</>
          ) : (
            <><FontAwesomeIcon icon={faCreditCard} /> ادفع {totalAmount} ر.س</>
          )}
        </button>

        {error && <div className="payment-status status-error mt-3">{error}</div>}
        {succeeded && (
          <div className="payment-status status-success mt-3">
            تمت العملية بنجاح! شكراً لثقتكم بالزين.
          </div>
        )}
      </form>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;