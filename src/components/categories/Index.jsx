import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Link from "next/link";
import { useSelector } from "react-redux";
import { ImageWithFallback } from "@/helpers/functions";

const Index = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <div className={styles["services-section"]}>
      <Container>
        <div className="services-list">
          <Row>
            {categories?.data?.map((item, idx) => (
              <Col lg={3} md={4} sm={6} xs={12} key={idx}>
                <div className="service-block">
                  <div className="img">
                    <ImageWithFallback
                      src={item?.icon}
                      alt={item?.name}
                      width={325}
                      height={325}
                    />
                    <Link href={`/categories/${item?.slug}`}>
                      <a> </a>
                    </Link>
                  </div>
                  <div className="info">
                    <h3>
                      <Link href={`/categories/${item?.slug}`}>
                        <a>{item?.name}</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
