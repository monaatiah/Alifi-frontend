import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { FiMapPin } from "react-icons/fi";
import { LuClock9 } from "react-icons/lu";

const Index = () => {
  return (
    <div className={styles["work-hours-section"]}>
      <Container>
        <Row>
          <Col lg={6} xs={12}>
            <div className="info">
              <h3>الموقع وساعات العمل</h3>
              <ul>
                <li>
                  <h4 className="d-flex align-items-center gap-3">
                    <div className="icon">
                      <FiMapPin />
                    </div>
                    العنوان
                  </h4>
                  <p>شارع الملك فهد، حي المدينة، الرياض 12345</p>
                </li>
                <li>
                  <h4 className="d-flex align-items-center gap-3">
                    <div className="icon">
                      <LuClock9 />
                    </div>
                    ساعات العمل
                  </h4>
                  <p>السبت - الخميس 9:00 ص - 9:00 م</p>
                  <p>الجمعة: 1:00 م - 9:00 م (مغلق صباحًا)</p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} xs={12}>
            <div className="map">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.1234567890123!2d46.1234567890123!3d24.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x123456789012345%3A0x123456789012345!2sCompany%20Location!5e0!3m2!1sen!2ssa!4v1234567890123"
       
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
