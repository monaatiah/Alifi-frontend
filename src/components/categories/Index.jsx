import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ImageWithFallback } from "@/helpers/functions";

const Index = () => {
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);

  const handleCategoryClick = (event, slug) => {
    event.preventDefault();
    if (!slug) return;
    router.push(`/categories/${slug}`);
  };

  return (
    <div className={styles["services-section"]}>
      <Container>
        <div className="services-list">
          <Row>
            {categories?.data?.map((item) => (
              <Col lg={3} md={4} sm={6} xs={12} key={item?.id || item?.slug}>
                <div className="service-block">
                  <div className="img">
                    <ImageWithFallback
                      src={item?.icon}
                      alt={item?.name}
                      width={325}
                      height={325}
                    />
                    <Link
                      href={`/categories/${item?.slug}`}
                      onClick={(event) =>
                        handleCategoryClick(event, item?.slug)
                      }>

                      {" "}

                    </Link>
                  </div>
                  <div className="info">
                    <h3>
                      <Link
                        href={`/categories/${item?.slug}`}
                        onClick={(event) =>
                          handleCategoryClick(event, item?.slug)
                        }>

                        {item?.name}

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
