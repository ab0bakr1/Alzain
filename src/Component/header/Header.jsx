import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../IMG/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Button from './Button';
import NavMobile from './NavMobile';
import { CartContext } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalQty = Array.isArray(cart) ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0) : 0;

  return (
    <header dir="rtl">
      <div className={scrolled ? 'header1 active' : 'header1'}>
        <Row className="align-items-center">
          {/* الجانب الأيمن: الشعار */}
          <Col xs={4} lg={2}>
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src={logo} alt="الزين" style={{ filter: 'brightness(0) invert(1)', width: '60px' }} />
              <span className="ms-2 d-none d-lg-block fw-bold text-white">AL ZAIN</span>
            </Link>
          </Col>

          {/* المنتصف: روابط التنقل */}
          <Col lg={7} className="nav d-none d-lg-flex justify-content-center">
            <Navbar />
          </Col>

          {/* الجانب الأيسر: أيقونات تفاعلية */}
          <Col xs={8} lg={3} className="d-flex justify-content-end align-items-center gap-2">
            <div className="user-actions">
              <div className="action-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
              
              <Link to="/Cart" className="action-btn" style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faCartShopping} />
                {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
              </Link>

              <Link to="/Login" className="action-btn d-none d-md-flex">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>

            {/* زر منيو الموبايل */}
            <div className="ul-mobile ms-2">
              <Button setVariant={setIsOpen} isOpen={isOpen} />
            </div>
          </Col>
        </Row>
      </div>

      {/* قائمة الموبايل الجانبية */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="nav-back"
          >
            <NavMobile setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;