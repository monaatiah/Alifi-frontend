import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/future/image";
import Link from "next/link";

import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const categoriesData = getComponentByIdentifier(
    pageData?.page_components,
    "categories_slider"
  );

  return (
    <div className={styles["shop-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle={categoriesData?.data?.subtitle}
          secTitle={categoriesData?.data?.title}
        />
        <div className="g-body">
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            pagination={{ dynamicBullets: true, clickable: true }}
            navigation={{
              nextEl: ".shop-next",
              prevEl: ".shop-prev",
            }}
            // autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
              1366: {
                slidesPerView: 4,
              },
              1920: {
                slidesPerView: 4,
              },
            }}
          >
            {categoriesData?.data?.categories?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="block">
                  <Link href={`/categories/${item?.slug}`} passHref>
                    <a aria-label={item?.name}></a>
                  </Link>
                  <div className="icon">
                    <Image
                      src={item?.icon}
                      alt={item?.name}
                      width={90}
                      height={90}
                    />
                  </div>
                  <h3>{item?.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sw-navigation d-flex align-items-center justify-content-center">
            <button className="shop-prev" aria-label="previous button">
              <ArrowRightIcon />
            </button>
            <button className="shop-next" aria-label="next button">
              <ArrowLeftIcon />
            </button>
          </div>
        </div>

        <div className="load-more">
          <Link href={categoriesData?.data?.cta_link || "/"} passHref>
            <a className="btn">{categoriesData?.data?.cta_title}</a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Index;
