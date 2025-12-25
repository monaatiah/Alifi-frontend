import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const aboutData = getComponentByIdentifier(
    pageData?.page_components,
    "features_section"
  );

  return (
    <div className={styles["about-section"]}>
      <Container>
        <div className="sec-head">
          <h1>{aboutData?.data?.title || ""}</h1>
          <p>{aboutData?.data?.description || ""}</p>
        </div>
        <Row>
          {aboutData?.data?.features?.map((item, index) => (
            <Col lg={3} md={6} sm={12} key={index}>
              <div className="item">
                <div className="icon">
                  <Image
                    src={item?.image || ""}
                    alt={item?.title}
                    width={100}
                    height={70}
                  />
                </div>
                <h2>{item?.title}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
