import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import "./Register.css";

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://alzain.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('تم إنشاء حسابك بنجاح! جاري تحويلك...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || { id: data.userId, name, email }));
        setTimeout(() => window.location.href = '/', 2000);
      } else {
        setError(data.message || 'عذراً، حدث خطأ ما');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم، يرجى المحاولة لاحقاً');
    }
  };

  return (
    <section className='register'>
      <Container>
        <motion.div 
          className="register-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="register-header">
            <h2>انضم إلى الزين</h2>
            <p>سجل الآن للحصول على أفضل أنواع الشاي الحضرمي</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                className='input'
                placeholder=" "
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <span>الاسم الكامل</span>
            </label>

            <label>
              <input
                type="text"
                className='input'
                placeholder=" "
                value={age}
                onFocus={(e) => (e.target.type = 'date')} 
                onBlur={(e) => (e.target.type = 'text')}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>تاريخ الميلاد (اختياري)</span>
            </label>

            <label>
              <input
                type="email"
                className='input'
                placeholder=" "
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>البريد الإلكتروني</span>
            </label>

            <label>
              <input
                type="password"
                className='input'
                placeholder=" "
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>كلمة المرور</span>
            </label>

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='alert-msg text-danger bg-light-danger'>{error}</motion.p>}
            {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='alert-msg text-success bg-light-success'>{success}</motion.p>}

            <input type="submit" value="إنشاء حساب جديد" />
          </form>

          <div className="register-footer">
            <p>لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a></p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Register;