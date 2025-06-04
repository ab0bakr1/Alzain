import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const variants ={
    primary: {
        transition: {
            staggerchildren: 0.1
        }
    },
    secondary: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
}

const itemV = {
    primary: {
        y: 0,
        opacity: 1
    },
    secondary: {
        y: 50,
        opacity: 0
    }
}

const Navbar = () => {
    const navItems = ["الرئيسية", "من نحن", "المنتجات", "الخدمات", "اتصل بنا"];
  return (
    <motion.ul variants={variants}>
        {navItems.map((item, index) => (
            <motion.a variants={itemV} key={index} href="#" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                <Link to={`/${item}`}>{item}</Link>
            </motion.a>
        ))}
    </motion.ul>
  )
}

export default Navbar