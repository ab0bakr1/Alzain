import React from 'react'
import hero from '../../IMG/Hero2.mp4'
import './Hero.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Hero = () => {
  return (
    <main className='hero'>
      <video autoPlay loop muted className='video'>
        <source src={hero} type='video/mp4' />
      </video>
      <div className='hero-text'>
        <h1 data-aos="fade-up" data-aos-duration="4000">أهلا بكم</h1>
        <p data-aos="fade-up" data-aos-duration="3000">خلطة حضرمية بلمسة الزين... لكل من يقدر نكهة الزمن الأصيل</p>
      </div>
    </main>
  )
}

export default Hero