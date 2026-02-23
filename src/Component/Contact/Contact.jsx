import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className='py-5 my-5'>
      <Container>
        <motion.div 
          className="contact-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Row className="g-0"> {/* g-0 لمنع الفراغات بين الأعمدة */}
            
            {/* الجانب الأيمن: معلومات التواصل */}
            <Col lg={5} className="contact-info">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>اتصل بنا</h3>
                <p className="mb-5 text-white-50">نحن هنا للإجابة على استفساراتكم وتلبية طلباتكم بكل حب.</p>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <h4>رقم الهاتف</h4>
                    <p dir="ltr">+968 1234 5678</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <h4>البريد الالكتروني</h4>
                    <p>sales@alzain.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <h4>الموقع</h4>
                    <p>سلطنة عمان، مسقط، الخوير</p>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* الجانب الأيسر: نموذج التواصل */}
            <Col lg={7} className="contact-form">
              <form action="#" method="post">
                <Row>
                  <Col md={6}>
                    <input type="text" placeholder='الاسم كاملاً' required />
                  </Col>
                  <Col md={6}>
                    <input type="email" placeholder='البريد الالكتروني' required />
                  </Col>
                  <Col xs={12}>
                    <input type="text" placeholder='عنوان الرسالة' required />
                  </Col>
                  <Col xs={12}>
                    <textarea rows="4" placeholder='كيف يمكننا مساعدتك؟' required></textarea>
                  </Col>
                  <Col xs={12}>
                    <button type="submit" className="submit-btn">
                      إرسال الرسالة <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
                    </button>
                  </Col>
                </Row>
              </form>
            </Col>

          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

export default Contact;