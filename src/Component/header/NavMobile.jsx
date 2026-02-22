import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
};

const NavMobile = ({ setIsOpen }) => {
  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: "من نحن", path: "/about" },
    { name: "الخدمات", path: "/services" },
    { name: "اتصل بنا", path: "/contact" }
  ];

  return (
    <div className="mobile-menu-wrapper" style={{ width: '100%', height: '100%' }}>
      {/* زر الإغلاق داخل القائمة */}
      <div className="d-flex justify-content-start p-4">
        <button 
          onClick={() => setIsOpen(false)} 
          style={{ background: 'none', border: 'none', color: '#FFD700', fontSize: '1.5rem' }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <motion.div 
        className='navmobile-content'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 40px',
          gap: '30px'
        }}
      >
        {navItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.8rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,215,0,0.1)',
                paddingBottom: '15px'
              }}
            >
              {item.name}
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '1rem', color: '#FFD700' }} />
            </Link>
          </motion.div>
        ))}
        
        {/* إضافة قسم إضافي في الأسفل للموبايل */}
        <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>تابعنا على منصات التواصل</p>
            <div className="d-flex gap-3" style={{ color: '#FFD700', fontSize: '1.2rem' }}>
                {/* يمكنك إضافة أيقونات السوشيال ميديا هنا */}
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NavMobile;