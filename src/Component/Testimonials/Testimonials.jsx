import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import './Testimonials.css';

const testimonials = [
  {
    img: "https://i.pravatar.cc/150?u=1",
    name: "أبوبكر المشهور",
    content: "كنت دائمًا أبحث عن شاي يجمع بين الطعم الرائع والجودة العالية، وقد وجدت ذلك تمامًا في شاي الزين. أستمتع بشكل خاص بنكهته الغنية التي تدوم في الفم."
  },
  {
    img: "https://i.pravatar.cc/150?u=2",
    name: "محمد عبدالله",
    content: "شاي الزين ليس مجرد مشروب، بل هو تجربة. أحب تقديمه لضيوفي، ودائمًا ما يتلقون إشادات على مذاقه المميز. التعبئة أنيقة وتحافظ على الجودة."
  },
  {
    img: "https://i.pravatar.cc/150?u=3",
    name: "طلعت زكرية",
    content: "ياخي هالزين مال الشاي شي ما صاير! من تشمه ريحته تعرف انه شغل عدل. ولما تشربه تحس براحة كذا... طعمه فيه غناوة ومو أي كلام."
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="testimonials-section py-5">
      <div className="container text-center mb-5">
         <h3 className="products-title">قالوا عن الزين</h3>
      </div>

      <div className="testim">
        <div className="wrap">
          {/* سهم اليمين */}
          <div className="arrow right" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          {/* سهم اليسار */}
          <div className="arrow left" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>

          <div className="cont">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card"
              >
                <div className="img-container">
                  <img src={testimonials[index].img} alt={testimonials[index].name} />
                  <div className="quote-icon" style={{
                    position: 'absolute', bottom: 0, right: 0,
                    background: '#FFD700', borderRadius: '50%',
                    width: '35px', height: '35px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#0C574C'
                  }}>
                    <FontAwesomeIcon icon={faQuoteRight} size="sm" />
                  </div>
                </div>
                <h2>{testimonials[index].name}</h2>
                <p>"{testimonials[index].content}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* النقاط */}
          <div className="dots">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;