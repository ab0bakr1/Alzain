import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Navbar = () => {
  const menuItems = [
    { title: "الرئيسية", link: "/" },
    { title: "متجرنا", link: "/products" },
    { title: "حكايتنا", link: "/about" },
    { title: "الخدمات", link: "/services" },
    { title: "تواصل معنا", link: "/contact" }
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item, i) => (
          <motion.li 
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={item.link}>{item.title}</Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;