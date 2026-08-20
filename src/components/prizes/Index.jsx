import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import {
  getComponentByIdentifier,
  ImageWithFallback,
} from "@/helpers/functions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const prizesData = getComponentByIdentifier(
    pageData?.page_components,
    "prizes",
  );

  return (
    <div className={styles["prizes-section"]}>
      <Container>
        <h3>{prizesData?.data?.title || ""}</h3>
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ dynamicBullets: true, clickable: true }}
          navigation={{
            nextEl: ".award-next",
            prevEl: ".award-prev",
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
          {prizesData?.data?.items?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="award-item">
                <ImageWithFallback
                  src={item?.image}
                  alt={item?.title}
                  width={170}
                  height={170}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-navigation d-flex align-items-center justify-content-center">
          <button className="award-prev" aria-label="previous button">
            <ArrowRightIcon />
          </button>
          <button className="award-next" aria-label="next button">
            <ArrowLeftIcon />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Index;
