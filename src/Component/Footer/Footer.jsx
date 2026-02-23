import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from '../../IMG/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" dir="rtl">
      <Container>
        <Row className="gy-4">
          {/* قسم من نحن */}
          <Col lg={4} md={6} className="footer-section about">
            <img src={logo} alt="الزين" />
            <p>
              تجربة فريدة تأخذكم إلى قلب حضرموت، حيث نختار أجود أنواع الشاي والأعشاب لنقدم لكم خلطة "الزين" التي تجسد الأصالة في كل رشفة.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faWhatsapp} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>

          {/* قسم الروابط السريعة */}
          <Col lg={4} md={6} className="footer-section links pe-lg-5">
            <h4>روابط سريعة</h4>
            <Row>
              <Col xs={6}>
                <ul>
                  <li><a href="#home">الرئيسية</a></li>
                  <li><a href="#products">المنتجات</a></li>
                  <li><a href="#about">حكايتنا</a></li>
                </ul>
              </Col>
              <Col xs={6}>
                <ul>
                  <li><a href="#faq">الأسئلة الشائعة</a></li>
                  <li><a href="#contact">تواصل معنا</a></li>
                  <li><a href="#services">الخدمات</a></li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* قسم معلومات التواصل */}
          <Col lg={4} md={12} className="footer-section cont">
            <h4>معلوماتنا</h4>
            <p><FontAwesomeIcon icon={faPhone} className="text-warning" /> 01123456789</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="text-warning" /> sales@alzain.com</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="text-warning" /> سلطنة عمان، مسقط، الخوير</p>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        <Container>
          <p className="m-0">
            حقوق الطبع والنشر &copy; {new Date().getFullYear()} <span>الزين</span>. جميع الحقوق محفوظة. 
            <br className="d-md-none" /> تصميم: <span>أبوبكر المشهور</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;