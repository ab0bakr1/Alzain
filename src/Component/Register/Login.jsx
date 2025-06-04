import React, { useState } from 'react';
import './Login.css';
import { Container } from 'react-bootstrap';
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'حدث خطأ أثناء تسجيل الدخول');
        setLoading(false);
        return;
      }

      // Save token and user info to localStorage or context
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setLoading(false);
      // Redirect or update UI after successful login
      window.location.href = '/'; // Redirect to home page or dashboard
    } catch (err) {
      setError('فشل الاتصال بالخادم');
      setLoading(false);
    }
  };

  return (
    <section className="login py-5">
      <Container>
        <form onSubmit={handleSubmit}>
          <h2>تسجيل الدخول</h2>
          <label htmlFor="email">
            <input
              className='input'
              type="email"
              id="email"
              value={email}
              placeholder=''
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
              placeholder=''
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            <span>كلمة المرور</span>
          </label> 
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </Container>
    </section>
  );
};

export default Login;
