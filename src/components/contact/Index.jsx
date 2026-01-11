import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";

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
        </Row>
      </Container>
    </div>
  );
};

export default Index;
