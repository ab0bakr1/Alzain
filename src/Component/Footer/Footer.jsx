import React from 'react'
import './Footer.css'
import { Container, Row } from 'react-bootstrap'
import logo from '../../IMG/logo.png'


const Footer = () => {
  return (
    <footer className="footer pt-5 pb-3">
      <Container>
        <Row className=''>
          <div className="footer-section about">
              <h4>حول الزين</h4>
              <div className="">
                <img src={logo} className="w-75"  alt="logo" height={200} />
                <p>خلطة حضرمية بلمسة الزين... لكل من يقدر نكهة الزمن الأصيل</p>
              </div>
          </div>
          <div className="footer-section links">
            <h4>الروابط السريعة</h4>
            <ul>
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#products">المنتجات</a></li>
              <li><a href="#contact">للتواصل معنا</a></li>
              <li><a href="#testimonials">التقييمات</a></li>
              <li><a href="#about">من نحن</a></li>
              <li><a href="#services">الخدمات</a></li>
              <li><a href="#faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div className="footer-section cont">
            <h4>تواصل معنا</h4>
            <p>الهاتف: 01123456789</p>
            <p>البريد الالكتروني : sales@alzain.com</p>
            <p>سلطنة عمان , مسقط , الخوير</p>
          </div>
        </Row>
      </Container>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Alzain. All rights reserved. By Abobakr almashhor
      </div>
    </footer>
  )
}

export default Footer
