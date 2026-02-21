import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const listVariants = {
  primary: { transition: { staggerChildren: 0.1 } },
  secondary: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};

const itemVariants = {
  primary: { y: 0, opacity: 1 },
  secondary: { y: 10, opacity: 0 }
};

const Navbar = () => {
  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "المنتجات", path: "/products" },
    { name: "الخدمات", path: "/services" },
    { name: "اتصل بنا", path: "/contact" }
  ];

  return (
    <motion.ul initial="secondary" animate="primary" variants={listVariants}>
      {navItems.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          <Link to={item.path}>{item.name}</Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default Navbar;