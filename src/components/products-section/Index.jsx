import React, { useMemo } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

import Link from "next/link";
import ProductBlock from "@/components/Shared/ProductBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const productsData = getComponentByIdentifier(
    pageData?.page_components,
    "product_tabs",
  );

  const categoryTabs = useMemo(
    () => productsData?.data?.category_tabs || [],
    [productsData],
  );

  return (
    <div className={styles["products-section"]}>
      <Pattern1 className="pattern-1" />
      <Pattern2 className="pattern-2" />
      <Pattern3 className="pattern-3" />
      <Container>
        <div className="sec-head">
          <h3>{productsData?.data?.title || ""}</h3>
          <p>{productsData?.data?.description || ""}</p>
        </div>

        <Tab.Container defaultActiveKey={0}>
          <div className="product-row-item">
            <div className="row-head d-flex align-items-center justify-content-between mb-4">
              <h4 className="category-name">{productsData?.data?.subtitle}</h4>
              <Nav variant="tabs" className={styles["products-tabs"]}>
                {categoryTabs?.map((categoryTab, index) => (
                  <Nav.Item key={categoryTab?.category?.id}>
                    <Nav.Link eventKey={index}>
                      {categoryTab?.category?.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            <Tab.Content>
              {categoryTabs?.map((categoryTab, index) => (
                <Tab.Pane key={categoryTab?.category?.id} eventKey={index}>
                  <div className="products-list">
                    <Swiper
                      spaceBetween={30}
                      slidesPerView={4}
                      navigation={true}
                      modules={[Navigation]}
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 3,
                        },
                        1366: {
                          slidesPerView: 4,
                        },
                        1920: {
                          slidesPerView: 4,
                        },
                      }}
                    >
                      {categoryTab?.products?.map((product, index) => (
                        <SwiperSlide key={product?.id || index}>
                          <ProductBlock item={product} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
          <div className="load-more">
            <Link href="/products">
              <a className="btn">عرض جميع المنتجات المميزة</a>
            </Link>
          </div>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Index;
