import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { GoSearch } from "react-icons/go";
import { FaArrowRight, FaListUl, FaArrowLeft } from "react-icons/fa6";
import { BsGrid3X3Gap } from "react-icons/bs";

import { IoMdClose } from "react-icons/io";
import PriceRange from "./PriceRange";
import Link from "next/link";
import Image from "next/future/image";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import ProductBlock from "./ProductBlock";

const Index = () => {
  const products = useMemo(
    () => [
      {
        id: "prod-1",
        name: "طعام قطط جاف للدعم الصحي اليومي",
        description: "طعام متوازن ومغذي للحفاظ على صحة قطتك.",
        image: Image1,
        price: 12.0,
      },
      {
        id: "prod-2",
        name: "رمل قطط متكتّل برائحة لطيفة",
        description: "رمل عالي الامتصاص للتحكم في الروائح بسهولة.",
        image: Image2,
        price: 18.5,
      },
      {
        id: "prod-3",
        name: "عبة كرة تفاعلية لتحفيز حركة القطط",
        description: "لعبة ممتعة تبقي قطتك نشيطة ومتحمسة.",
        image: Image3,
        price: 25.0,
      },
      {
        id: "prod-4",
        name: "Alimento Natural para Perros",
        description:
          "Comida saludable y equilibrada para el bienestar de tu perro.",
        image: Image1,
        price: 30.0,
      },
      {
        id: "prod-5",
        name: "Juguete Interactivo para Gatos",
        description:
          "Mantén a tu gato entretenido con este juguete estimulante.",
        image: Image1,
        price: 30.0,
      },
    ],
    []
  );

  const [layoutView, setLayoutView] = useState("grid");

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="shop-filter d-flex justify-content-between align-items-center gap-3">
              <div className="inputs-wrap d-flex align-items-center gap-3">
                <div className="search">
                  <button type="button" aria-label="search button">
                    <GoSearch color="#fff" />
                  </button>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="ابحث عن منتج...."
                  />
                </div>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                >
                  <option selected>فرز حسب</option>
                  <option value="1">الأحدث</option>
                  <option value="2">الأقدم</option>
                  <option value="3">الأعلى سعراً</option>
                  <option value="4">الأقل سعراً</option>
                </select>
              </div>

              <button
                type="button"
                className="filter-btn"
                aria-label="filter button"
                onClick={() => {
                  setLayoutView(layoutView === "grid" ? "list" : "grid");
                }}
              >
                {layoutView === "list" ? (
                  <BsGrid3X3Gap color="#fff" size={22} />
                ) : (
                  <FaListUl color="#fff" size={22} />
                )}
              </button>
            </div>
          </Col>
          <Col lg={3}>
            <div className="shop-sidebar">
              <div className="head d-flex justify-content-between align-items-center gap-3">
                <button type="button" aria-label="close sidebar">
                  <IoMdClose />
                </button>

                <button
                  type="button"
                  className="filter-btn"
                  aria-label="filter"
                >
                  حذف الفلاتر
                </button>
              </div>

              <div className="widget">
                <h3>السعر</h3>
                <div className="price-range-wrap">
                  <PriceRange />
                  <button type="button" className="btn">
                    تصفية
                  </button>
                </div>
              </div>
              <div className="widget">
                <h3>العلامة التجارية</h3>
                <ul>
                  <li>
                    <Link href="/">
                      <a>(4) أبل</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>(6) سامسونج</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>(3) هواوي</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>(2) شاومي</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>(1) أوبو</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>(2) فيفو</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="widget">
                <h3>المنتجات المميزة</h3>
                {products.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="featured-product d-flex gap-3"
                  >
                    <div className="img">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                      />
                      <Link href={`/shop/${product.id}`}>
                        <a></a>
                      </Link>
                    </div>
                    <div className="info">
                      <h4>
                        <Link href={`/shop/${product.id}`}>
                          <a>{product.name}</a>
                        </Link>
                      </h4>
                      {/* <p>{product.description}</p> */}
                      <span className="price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={9}>
            <Row className={`${layoutView === "list" ? "list" : ""}`}>
              {products.map((item) => (
                <Col key={item.id} lg={layoutView === "grid" ? 4 : 12} md={6}>
                  <ProductBlock item={item} />
                </Col>
              ))}
            </Row>

            <div className="global-pagination">
              <ul>
                <li>
                  <button
                    type="button"
                    aria-label="previous page"
                    className="action-btn"
                  >
                    <FaArrowRight />
                  </button>
                </li>
                <li>
                  <button type="button" className="active" aria-label="page 1">
                    1
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 2">
                    2
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 3">
                    3
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 4">
                    4
                  </button>
                </li>
                <li>
                  <button type="button" aria-label="page 5">
                    5
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    aria-label="next page"
                    className="action-btn next-btn"
                  >
                    <FaArrowLeft />
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
