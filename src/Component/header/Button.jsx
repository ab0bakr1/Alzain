import React from 'react';
import { motion } from "framer-motion";

const Button = ({ setVariant, isOpen }) => {
  return (
    <button 
      onClick={() => setVariant(!isOpen)}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.3s ease'
      }}
      className="mobile-menu-toggle"
    >
      <svg width="23" height="18" viewBox="0 0 23 18">
        {/* الخط العلوي */}
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke={isOpen ? "#FFD700" : "#ffffff"}
          strokeLinecap="round"
          animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
          transition={{ duration: 0.3 }}
        />
        {/* الخط الأوسط */}
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* الخط السفلي */}
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke={isOpen ? "#FFD700" : "#ffffff"}
          strokeLinecap="round"
          animate={isOpen ? { d: "M 3 2.5 L 17 16.346" } : { d: "M 2 16.346 L 20 16.346" }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </button>
  );
};

export default Button;