import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const variants = {
    primary: {
        transition: {
            staggerChildren: 0.1
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

const NavMobile = () => {
    const navItems = ["الرئيسية", "من نحن", "المنتجات", "الخدمات", "اتصل بنا"];
  return (
    <>
    <motion.div variants={variants} className='navmobile'>
        {navItems.map((item, index) => (
            <motion.a variants={itemV} key={index} href="#" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                <Link to={`/${item}`}>{item}</Link>
            </motion.a>
        ))}
    </motion.div>
    
    </>
  )
}

export default NavMobile