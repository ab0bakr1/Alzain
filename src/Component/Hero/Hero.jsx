import React, { useEffect } from 'react';
import heroVideo from '../../IMG/Hero2.mp4';
import './Hero.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <main className="hero">
      {/* الفيديو مع خاصية playsInline لتحسين الأداء على الموبايل */}
      <video autoPlay loop muted playsInline className="video">
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-text">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          data-aos="zoom-out"
        >
          أهلاً بكم في الزين
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          data-aos="fade-up"
        >
          خلطة حضرمية بلمسة الزين... لكل من يقدر نكهة الزمن الأصيل 
        </motion.p>

        <motion.button 
          className="hero-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          اكتشف منتجاتنا
        </motion.button>
      </div>

      {/* لمسة فنية: سهم لأسفل يلمح لوجود محتوى */}
      <div className="scroll-indicator d-none d-md-block">
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: '#FFD700', fontSize: '1.5rem', position: 'absolute', bottom: '30px', left: '50%' }}
          >
            ↓
          </motion.div>
      </div>
    </main>
  );
};

export default Hero;