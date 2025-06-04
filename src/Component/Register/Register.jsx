import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import "./Register.css"

const Register = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('') // age is optional, not sent to backend
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !email || !password) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('تم إنشاء الحساب بنجاح')
        setName('')
        setAge('')
        setEmail('')
        setPassword('')

        // Save token and user info to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || { id: data.userId, name, email }))

        window.location.href = '/'
      } else {
        setError(data.message || 'حدث خطأ أثناء التسجيل')
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم')
    }
  }

  return (
    <section className='register py-5'>
      <Container>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder=''
              className='input'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span>ادخل اسمك</span>
          </label>
          <label>
            <input
              type="text"
              value={age}
              placeholder=''
              className='input'
              required
              onChange={(e) => setAge(e.target.value)}
              id="customDate"
              onFocus={(e) => (e.target.type = 'date')} 
              onBlur={(e) => (e.target.type = 'text')}
            />
            <span>ادخل تاريخ الميلاد</span>
          </label>
          <label>
            <input
              type="email"
              value={email}
              required
              placeholder=''
              className='input'
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>ادخل بريدك الالكتروني</span>
          </label>
          <label>
            <input
              type="password"
              value={password}
              required
              placeholder=''
              className='input'
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>ادخل كلمة المرور</span>
          </label>
          <input type="submit" value="انشاء حساب" />
          {error && <p className='text-danger text-center'>{error}</p>}
          {success && <p className='text-success text-center'>{success}</p>}
          <h5 className='text-center font-weight-bold'>لديك حساب؟ <a className='text-decoration-none' href="/login">تسجيل الدخول</a></h5>
        </form>
      </Container>
      
    </section>
  )
}

export default Register
