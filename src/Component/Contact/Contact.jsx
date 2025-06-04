import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className='py-5 py-md-5'>
        <Container>
            <h3 className='text-center mb-2 mb-md-3'>للتواصل معنا</h3>
            <Row className="contact">
                <Col className="contact-form">
                    <form action="" method="post">
                        <input type="text" name="name" placeholder='ادخل اسمك' required />
                        <input type="email" name="email" placeholder='ادخل بريدك الالكتروني' required />
                        <input type="text" name="subject" placeholder='ادخل عنوان الموضوع' required />
                        <textarea name="message" id="" cols="30" rows="5" placeholder='ادخل رسالتك' required></textarea>
                        <input type="submit" value="Send" />
                    </form>
                </Col>
                <Col className="contact-info">
                    <div className="contact-info-item">
                        <h4>رقم الهاتف</h4>
                        <p>01123456789</p>
                    </div>
                    <div className="contact-info-item">
                        <h4>البريد الالكتروني</h4>
                        <p>sales@alzain.com</p>
                    </div>
                    <div className="contact-info-item">
                        <h4>الموقع</h4>
                        <p>سلطنة عمان , مسقط , الخوير</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Contact