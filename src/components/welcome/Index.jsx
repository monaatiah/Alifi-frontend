import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getComponentByIdentifier, handleImageLink } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const welcomeData = getComponentByIdentifier(
    pageData?.page_components,
    "about_wecome",
  );

  return (
    <div className={styles["services-infos"]}>
      <Container>
        <Row className="flex-row-reverse align-items-center">
          <Col lg={6}>
            <div className="img">
              <Image
                src={handleImageLink(welcomeData?.data?.image)}
                alt="service image"
                width={630}
                height={630}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="info">
              <h2>{welcomeData?.data?.title || ""}</h2>
              <div className="desc">
                <div
                  dangerouslySetInnerHTML={{
                    __html: welcomeData?.data?.description || "",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
