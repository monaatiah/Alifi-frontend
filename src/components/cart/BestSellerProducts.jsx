import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import ProductBlock from "./ProductBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";

import PrevArrow from "./assets/arrow-left.svg";
import NextArrow from "./assets/arrow-right.svg";

const BestSellerProducts = () => {
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

  return (
    <div className="best-seller-products">
      <Container>
        <h3>المنتجات الأكثر مبيعًا</h3>
        <div className="products-list">
          <button className="nav-btn prev-btn" aria-label="previous">
            <PrevArrow />
          </button>
          <button className="nav-btn next-btn" aria-label="next">
            <NextArrow />
          </button>
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
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
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductBlock item={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default BestSellerProducts;
