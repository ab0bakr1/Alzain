import React from 'react';
import { motion } from "framer-motion";

const Button = ({ setVariant, isOpen }) => {
  return (
    <button onClick={() => setVariant(!isOpen)}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path 
          fill="transparent"
          strokeWidth="3" 
          stroke={isOpen ? "white" : "black"} 
          strokeLinecap="round" 
          animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
        />
        <motion.path 
          fill="transparent"
          strokeWidth="3" 
          stroke={isOpen ? "white" : "black"} 
          strokeLinecap="round" 
          d="M 2 9.423 L 20 9.423"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.path 
          fill="transparent"
          strokeWidth="3" 
          stroke={isOpen ? "white" : "black"} 
          strokeLinecap="round" 
          animate={isOpen ? { d: "M 3 2.5 L 17 16.346" } : { d: "M 2 16.346 L 20 16.346" }}
        />
      </svg>
    </button>
  );
}

export default Button;