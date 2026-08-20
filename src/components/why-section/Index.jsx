import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import SecMainTitle from "../Shared/SecMainTitle";
import { useSelector } from "react-redux";
import { getComponentByIdentifier, ImageWithFallback } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const whyData = getComponentByIdentifier(
    pageData?.page_components,
    "why_choose_us"
  );

  return (
    <div className={styles["why-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle={whyData?.data?.subtitle}
          secTitle={whyData?.data?.title}
        />
        <Row>
          {whyData?.data?.features?.map((item, index) => (
            <Col key={index} md={6} lg={3}>
              <div className="block">
                <div className="img">
                  <ImageWithFallback
                    src={item?.image}
                    alt={item?.title}
                    width={120}
                    height={120}
                  />
                </div>
                <h3>{item?.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
