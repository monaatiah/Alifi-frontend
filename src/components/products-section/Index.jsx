import React, { useMemo, useCallback } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import Link from "next/link";
import ProductBlock from "./ProductBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const productsData = getComponentByIdentifier(
    pageData?.page_components,
    "product_tabs"
  );

  const categories = useMemo(
    () => [
      {
        id: "cats-products",
        name: "منتجات للقطط",
        subCategories: [
          {
            id: "cats-games",
            name: "الألعاب والإكسسوارات",
            slug: "games-accessories",
          },
          { id: "cats-supplies", name: "لوازم", slug: "supplies" },
          { id: "cats-food", name: "طعام", slug: "food" },
        ],
        slug: "cats-products",
      },
      {
        id: "dogs-products",
        name: "منتجات للكلاب",
        subCategories: [
          {
            id: "dogs-games",
            name: "الألعاب والإكسسوارات",
            slug: "games-accessories",
          },
          { id: "dogs-supplies", name: "لوازم", slug: "supplies" },
          { id: "dogs-food", name: "طعام", slug: "food" },
        ],
        slug: "dogs-products",
      },
    ],
    []
  );

  const products = useMemo(
    () => [
      {
        id: "prod-1",
        name: "Rosquillas Caseras para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 12.0,
        category: { id: "cat-1", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-2",
        name: "Juguete Interactivo para Gatos",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image2,
        price: 18.5,
        category: { id: "cat-2", name: "لوازم" },
      },
      {
        id: "prod-3",
        name: "Cama Cómoda para Mascotas",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image3,
        price: 25.0,
        category: { id: "cat-3", name: "طعام" },
      },
      {
        id: "prod-4",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-4", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-5",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-5", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-6",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-6", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-7",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-7", name: "الألعاب والإكسسوارات" },
      },
    ],
    []
  );

  const filterProducts = useCallback(
    (subCategoryName) => {
      return products.filter((p) => p.category.name === subCategoryName);
    },
    [products]
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
        {
          //render categories as product rows
          categories.map((category) => (
            <Tab.Container key={category.id} defaultActiveKey={0}>
              <div className="product-row-item">
                <div className="row-head d-flex align-items-center justify-content-between mb-4">
                  <h4 className="category-name">{category.name}</h4>
                  <Nav variant="tabs" className={styles["products-tabs"]}>
                    {
                      //render subcategories as nav items
                      category.subCategories.map((subCategory, index) => (
                        <Nav.Item key={subCategory.id}>
                          <Nav.Link eventKey={index}>
                            {subCategory.name}
                          </Nav.Link>
                        </Nav.Item>
                      ))
                    }
                  </Nav>
                </div>
                <Tab.Content>
                  {
                    //render products as tab panes
                    category.subCategories.map((subCategory, index) => (
                      <Tab.Pane eventKey={index} key={subCategory.id}>
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
                            {filterProducts(subCategory.name).map((product) => (
                              <SwiperSlide key={product.id}>
                                <ProductBlock item={product} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </Tab.Pane>
                    ))
                  }
                </Tab.Content>
              </div>
              <div className="load-more">
                <Link href="/products">
                  <a className="btn">عرض جميع المنتجات المميزة</a>
                </Link>
              </div>
            </Tab.Container>
          ))
        }
      </Container>
    </div>
  );
};

export default Index;
