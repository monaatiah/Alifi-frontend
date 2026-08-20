import React from "react";
import { Container } from "react-bootstrap";
import ProductBlock from "./ProductBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import PrevArrow from "./assets/arrow-left.svg";
import NextArrow from "./assets/arrow-right.svg";
import { getComponentByIdentifier } from "@/helpers/functions";
import { useSelector } from "react-redux";

const BestSellerProducts = () => {
  const { pageData } = useSelector((state) => state.settings);
  const cartBestSellerData = getComponentByIdentifier(
    pageData?.page_components,
    "cart_best_seller_products",
  );

  return (
    <div className="best-seller-products">
      <Container>
        <h3>{cartBestSellerData?.data?.title}</h3>
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
            {cartBestSellerData?.data?.products?.map((product) => (
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
