import React from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import { v4 } from "uuid";
import ProductBlock from "./ProductBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";

const Index = () => {
  const categories = [
    {
      id: v4(),
      name: "منتجات للقطط",
      subCategories: [
        { id: v4(), name: "الألعاب والإكسسوارات", slug: "games-accessories" },
        { id: v4(), name: "لوازم", slug: "supplies" },
        { id: v4(), name: "طعام", slug: "food" },
      ],
      slug: "cats-products",
    },
    {
      id: v4(),
      name: "منتجات للكلاب",
      subCategories: [
        { id: v4(), name: "الألعاب والإكسسوارات", slug: "games-accessories" },
        { id: v4(), name: "لوازم", slug: "supplies" },
        { id: v4(), name: "طعام", slug: "food" },
      ],
      slug: "dogs-products",
    },
  ];

  const products = [
    {
      id: v4(),
      name: "Rosquillas Caseras para Perros",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image1,
      price: 12.0,
      category: { id: v4(), name: "الألعاب والإكسسوارات" },
    },
    {
      id: v4(),
      name: "Juguete Interactivo para Gatos",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image2,
      price: 18.5,
      category: { id: v4(), name: "لوازم" },
    },
    {
      id: v4(),
      name: "Cama Cómoda para Mascotas",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image3,
      price: 25.0,
      category: { id: v4(), name: "طعام" },
    },
    {
      id: v4(),
      name: "Alimento Natural para Perros",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image1,
      price: 30.0,
      category: { id: v4(), name: "الألعاب والإكسسوارات" },
    },
    {
      id: v4(),
      name: "Alimento Natural para Perros",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image1,
      price: 30.0,
      category: { id: v4(), name: "الألعاب والإكسسوارات" },
    },
    {
      id: v4(),
      name: "Alimento Natural para Perros",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image1,
      price: 30.0,
      category: { id: v4(), name: "الألعاب والإكسسوارات" },
    },
    {
      id: v4(),
      name: "Alimento Natural para Perros",
      description:
        "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
      image: Image1,
      price: 30.0,
      category: { id: v4(), name: "الألعاب والإكسسوارات" },
    },
  ];

  return (
    <div className={styles["products-section"]}>
      <Pattern1 className="pattern-1" />
      <Pattern2 className="pattern-2" />
      <Pattern3 className="pattern-3" />
      <Container>
        <div className="sec-head">
          <h3>المنتجات</h3>
          <p>
            نقدّم لك مجموعة من المنتجات الموصى بها من خبراء الحيوانات الأليفة
            والمحبّين مثلِك. منتجات عالية الجودة مختارة لتناسب احتياجات حيوانك
            اليومية
          </p>
        </div>
        {
          //render categories as product rows
          categories.map((category) => (
            <Tab.Container
              key={category.id}
              defaultActiveKey={0}
              transition={true}
              timeout={1000}
            >
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
                            navigation
                            modules={[Pagination, Navigation, Autoplay]}
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
                            {
                              //filter products by subcategory
                              products
                                .filter(
                                  (product) =>
                                    product.category.name === subCategory.name
                                )
                                .map((product) => (
                                  <SwiperSlide key={product.id}>
                                    <ProductBlock item={product} />
                                  </SwiperSlide>
                                ))
                            }
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
