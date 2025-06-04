import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../IMG/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Button from './Button';
import NavMobile from './NavMobile';
import { CartContext } from '../../context/CartContext';
// framer motion
import { motion } from 'framer-motion';

// css
import './Header.css';
import { Link } from 'react-router-dom';

const variants = {
  primary: {
    clipPath: 'circle(1200px at 350px 50px)',
    transition: {
      type: 'spring',
      stiffness: 20,
    },
  },
  secondary: {
    clipPath: 'circle(30px at 350px 50px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

function Header() {
  const [scroolled, setScroolled] = useState(false);
  const [variant, setVariant] = useState(false);
  const [name, setName] = useState('');
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const handscroll = () => {
      if (window.scrollY > 100) {
        setScroolled(true);
      } else {
        setScroolled(false);
      }
    };
    window.addEventListener('scroll', handscroll);
    return () => window.removeEventListener('scroll', handscroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setName(user.name);
    } else {
      setName('تسجيل الدخول');
    }
  }, []);

  const cartquantity = () => {
    return Array.isArray(cart)
    ? cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0)
    : 0;
  };

  return (
    <header dir="rtl" lang="ar" className={scroolled ? 'header1 active' : 'header1 shadow'}>
      <Container>
        <Row className="align-items-center justify-content-between py-1" style={{ height: '90px' }}>
          <Col xs={3} md={2} className="ul-mobile">
            <motion.div className="nav-side" animate={variant ? 'primary' : 'secondary'}>
              <motion.div className="nav-back" variants={variants}>
                <NavMobile />
              </motion.div>
              <Button setVariant={setVariant} />
            </motion.div>
          </Col>
          <Col xs={6} md={2} className="h-100">
            <img src={logo} className="logo img-fluid" alt="logo" width={100} />
          </Col>
          <Col xs={6} md={8} className="nav">
            <Navbar />
          </Col>
          <Col xs={3} md={2}>
            <div className="user d-flex justify-content-center align-items-center gap-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <Link to="/Cart" id="cart" className="d-flex align-items-center gap-2 text-decoration-none text-dark" style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faCartShopping} style={{ cursor: 'pointer' }} />
                {cartquantity() > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      right: '-15px',
                      backgroundColor: '#000',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 5px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      minWidth: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {cartquantity()}
                  </span>
                )}
              </Link>
              <Link
                to={name === 'تسجيل الدخول' ? '/Register' : '/'}
                id="login"
                className="d-flex align-items-center gap-2 text-decoration-none text-dark"
                style={{ cursor: 'pointer' }}
              >
                {name === 'تسجيل الدخول' ? (
                  <FontAwesomeIcon icon={faUserPlus} style={{ cursor: 'pointer' }} />
                ) : (
                  <FontAwesomeIcon icon={faUser} style={{ cursor: 'pointer' }} />
                )}
                <h6 className="mb-0" style={{ cursor: 'pointer' }}>
                  {name}
                </h6>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
