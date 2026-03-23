import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

import HeroImg from "./assets/hero.png";
import Image from "next/future/image";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const Index = ({
  title,
  description,
  pageName,
  paymentPages,
  sector,
  imageSrc,
}) => {
  return (
    <div
      className={
        paymentPages
          ? `${styles["breadcrumb-section"]} ${styles["payment-pages"]}`
          : styles["breadcrumb-section"]
      }
    >
      <Container>
        {!paymentPages && (
          <>
            <Pattern1 className="pattern-1" />
            <Pattern2 className="pattern-2" />
            <Pattern3 className="pattern-3" />
          </>
        )}
        <Row className="align-items-center">
          <Col lg={6} xs={12}>
            <div className="info">
              <h3>{title}</h3>
              {description && <p>{description}</p>}
              <ul className="d-flex align-items-center">
                <li className="d-flex align-items-center">
                  <Link href="/">
                    <a>
                      <FormattedMessage id="home" />
                    </a>
                  </Link>
                </li>
                {sector && (
                  <li>
                    <Link href={sector?.link || ""}>
                      <a>
                        <FormattedMessage id={sector?.name} />
                      </a>
                    </Link>
                  </li>
                )}
                <li>{pageName}</li>
              </ul>
            </div>
          </Col>
          {!paymentPages && imageSrc && (
            <Col lg={6} xs={12}>
              <div className="img">
                <Image
                  src={imageSrc || HeroImg}
                  alt="Breadcrumb Hero"
                  width={500}
                  height={250}
                  priority
                />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
