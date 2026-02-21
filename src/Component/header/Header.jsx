import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../IMG/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Button from './Button';
import NavMobile from './NavMobile';
import { CartContext } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css';

const sidebarVariants = {
  primary: {
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  },
  secondary: {
    x: '100%',
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('تسجيل الدخول');
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserName(user.name);
  }, []);

  const cartQuantity = () => {
    return Array.isArray(cart) ? cart.reduce((total, item) => total + (item.quantity || 0), 0) : 0;
  };

  return (
    <header dir="rtl" className={scrolled ? 'header1 active' : 'header1'}>
      <Container>
        <Row className="align-items-center justify-content-between">
          {/* موبايل منيو */}
          <Col xs={2} className="ul-mobile">
            <div className="nav-side">
              <Button setVariant={setIsOpen} isOpen={isOpen} />
              <motion.div 
                className="nav-back" 
                initial="secondary"
                animate={isOpen ? 'primary' : 'secondary'}
                variants={sidebarVariants}
              >
                <NavMobile />
              </motion.div>
            </div>
          </Col>

          {/* الشعار */}
          <Col xs={4} lg={2}>
            <Link to="/">
              <img src={logo} className="logo img-fluid" alt="الزين" width={80} />
            </Link>
          </Col>

          {/* روابط التنقل (دسكتاب) */}
          <Col lg={7} className="nav d-none d-lg-block">
            <Navbar />
          </Col>

          {/* أيقونات المستخدم */}
          <Col xs={6} lg={3}>
            <div className="user-actions justify-content-end">
              <Link to="#" className="icon-link"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
              
              <Link to="/Cart" className="icon-link">
                <FontAwesomeIcon icon={faCartShopping} />
                {cartQuantity() > 0 && <span className="cart-badge">{cartQuantity()}</span>}
              </Link>

              <Link to={userName === 'تسجيل الدخول' ? '/Register' : '/Profile'} className="icon-link d-flex align-items-center gap-2 text-decoration-none">
                <FontAwesomeIcon icon={userName === 'تسجيل الدخول' ? faUserPlus : faUser} />
                <span className="user-name mb-0" style={{fontSize: '14px'}}>{userName}</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;