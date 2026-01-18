import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiClock1, CiMobile3 } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

const Index = () => {
  return (
    <div className={styles["contact-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle="نحن نحب أن نسمع منك"
          secTitle="رعاية الحيوانات الأليفة من قبل خبراء"
        />
        <Row>
          <Col lg={4} md={6} sm={12}>
            <div className="block">
              <div className="icon">
                <MdOutlineMailOutline />
              </div>
              <div className="info">
                <h4>البريد الإلكتروني</h4>
                <p>
                  <Link href="mailto:info@domain.com">
                    <a>info@domain.com</a>
                  </Link>
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <div className="block">
              <div className="icon">
                <CiMobile3 />
              </div>
              <div className="info">
                <h4> رقم التليفون</h4>
                <p className="d-flex flex-column gap-1">
                  <Link href="tel:+09 121 359 6224">
                    <a>+09 121 359 6224</a>
                  </Link>
                  <span>24/7 Support team</span>
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <div className="block">
              <div className="icon">
                <CiClock1 />
              </div>
              <div className="info">
                <h4> ساعات العمل</h4>
                <p className="d-flex flex-column gap-1">
                  <span>9:00 AM - 5:00 PM</span>
                  <span>Monday - Friday</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
