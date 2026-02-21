import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavMobile = () => {
  const navItems = ["الرئيسية", "من نحن", "المنتجات", "الخدمات", "اتصل بنا"];
  
  return (
    <div className='navmobile'>
      {navItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ x: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={`/${item}`}>{item}</Link>
        </motion.div>
      ))}
    </div>
  );
}

export default NavMobile;