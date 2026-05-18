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
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = ({
  identifier = "breadcrumb",
  title,
  description,
  pageName,
  paymentPages,
  sector,
  imageSrc,
}) => {
  const router = useRouter();
  const { pageData } = useSelector((state) => state.settings);

  const breadcrumbData = getComponentByIdentifier(
    pageData?.page_components,
    identifier,
  )?.data;

  const routeName =
    router?.asPath
      ?.split("?")[0]
      ?.split("/")
      ?.filter(Boolean)
      ?.slice(-1)[0]
      ?.replace(/-/g, " ") || "";

  const resolvedTitle =
    title ||
    breadcrumbData?.title ||
    pageData?.meta?.title ||
    pageData?.config?.title ||
    pageData?.title ||
    "";

  const resolvedDescription =
    description || breadcrumbData?.description || pageData?.meta?.description || "";

  const resolvedPageName = pageName || breadcrumbData?.page_name || resolvedTitle || routeName;
  const resolvedImage = imageSrc || breadcrumbData?.image || HeroImg;

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
              <h3>{resolvedTitle}</h3>
              {resolvedDescription && <p>{resolvedDescription}</p>}
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
                <li>{resolvedPageName}</li>
              </ul>
            </div>
          </Col>
          {!paymentPages && (
            <Col lg={6} xs={12}>
              <div className="img">
                <Image
                  src={resolvedImage}
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
