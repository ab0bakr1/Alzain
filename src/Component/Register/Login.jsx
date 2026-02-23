import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://alzain.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'خطأ في البريد أو كلمة المرور');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setLoading(false);
      window.location.href = '/'; 
    } catch (err) {
      setError('تعذر الاتصال بالخادم، جرب مرة أخرى');
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <Container>
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>مرحباً بك مجدداً</h2>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <input
                className='input'
                type="email"
                id="email"
                value={email}
                placeholder=' '
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span>البريد الإلكتروني</span>
            </label>

            <label htmlFor="password">
              <input
                className='input'
                type="password"
                id="password"
                value={password}
                placeholder=' '
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>كلمة المرور</span>
            </label>

            {error && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {error}
              </motion.p>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : 'دخول'}
            </button>
          </form>

          <div className="login-footer">
            <p>ليس لديك حساب؟ <a href="/register">أنشئ حسابك الآن</a></p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Login;