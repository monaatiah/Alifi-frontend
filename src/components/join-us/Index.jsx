import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Pattern1 from "./assets/1.png";
import Pattern2 from "./assets/2.svg";
import Image from "next/future/image";

const Index = () => {
  return (
    <div className={styles["joinus-section"]}>
      <Container>
        <div className="inner">
          <Image
            src={Pattern1}
            alt=""
            width={120}
            height={140}
            className="pattern-1"
          />
          <Pattern2 className="pattern-2" />
          <Row>
            <Col lg={6} xs={12}>
              <div className="info">
                <h3>انضم إلى عائلة أليفي</h3>
                <p>
                  كن جزءًا من مجتمع أليفي هل تملك متجرًا أو منتجات مخصصة أو
                  خدمات للحيوانات الأليفة؟انضم إلى شبكة أليفي وشاركنا شغفك
                </p>
              </div>
            </Col>
            <Col lg={6} xs={12}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
