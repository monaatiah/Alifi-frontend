import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const servicesData = getComponentByIdentifier(
    pageData?.page_components,
    "services",
  );

  return (
    <div className={styles["services-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle={servicesData?.data?.subtitle || ""}
          secTitle={servicesData?.data?.title || ""}
        />
        <Row>
          {servicesData?.data?.services?.map((item) => (
            <Col key={item.id} md={6} lg={3}>
              <div className="service-block">
                <div className="img">
                  <Image
                    src={item?.cover_image || ""}
                    alt={item?.title}
                    width={325}
                    height={325}
                  />
                  <Link href={`/services/${item?.slug}`}>
                     
                  </Link>
                </div>
                <div className="info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link href={`/services/${item?.slug}`}>
                    اعرف المزيد
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
