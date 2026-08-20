import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

import { useSelector } from "react-redux";
import { getComponentByIdentifier, handleImageLink } from "@/helpers/functions";
import Image from "next/image";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const ourVisionData = getComponentByIdentifier(
    pageData?.page_components,
    "our_vision",
  );

  return (
    <div className={styles["our-vision-section"]}>
      <Pattern1 className="pattern-1" />
      <Pattern2 className="pattern-2" />
      <Pattern3 className="pattern-3" />
      <Container>
        <div className="sec-head">
          <h3>{ourVisionData?.data?.title || ""}</h3>
        </div>
        <div className="our-vision-items">
          <Row>
            {ourVisionData?.data?.items?.map((item, index) => (
              <Col key={index} lg={6} xs={12}>
                <div className="item">
                  <div className="icon">
                    <Image
                      src={handleImageLink(item?.icon)}
                      alt={`icon-${index}`}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="info">
                    <h3>{item?.title || ""}</h3>
                    <p>{item?.description || ""}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="our-vision-media">
          <Row>
            {ourVisionData?.data?.media?.map((item, index) => (
              <Col key={index} lg={6} xs={12}>
                <div className="item">
                  <Image
                    src={handleImageLink(item?.image)}
                    alt={`media-${index}`}
                    width={600}
                    height={400}
                  />
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
