import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { Autoplay, Navigation } from "swiper";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";
import QuoteIcon from "./assets/quote.png";
import Image from "next/future/image";
import { ImageWithFallback } from "@/helpers/functions";

const Index = ({ data, testimonialsData }) => {
  return (
    <div className={styles["reviews-section"]}>
      <Container className="position-relative">
        <div className="sec-head">
          <h3>آراء المستخدمين</h3>
          <div className="sw-navigation d-flex align-items-center gap-3">
            <button className="sw-prev" aria-label="previous button">
              <ArrowRightIcon />
            </button>
            <button className="sw-next" aria-label="next button">
              <ArrowLeftIcon />
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          navigation={{
            nextEl: ".sw-next",
            prevEl: ".sw-prev",
          }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonialsData
            ? testimonialsData?.data?.items?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="block">
                    <div className="rate">
                      {[...Array(item?.data?.rating)].map((_, idx) => (
                        <FaStar key={idx} color="#CFFD55" size={20} />
                      ))}
                    </div>
                    <div className="desc">
                      <p>{item?.body}</p>
                    </div>

                    <div className="user-info">
                      <h4>{item?.data?.customer_name}</h4>
                      <span>{item?.data?.position}</span>
                    </div>
                    <div className="quote-icon">
                      <ImageWithFallback
                        src={item?.data?.customer_image}
                        alt="quote icon"
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : data?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="block">
                    <div className="rate">
                      {[...Array(item?.rating)].map((_, idx) => (
                        <FaStar key={idx} color="#CFFD55" size={20} />
                      ))}
                    </div>
                    <div className="desc">
                      <p>{item?.comment}</p>
                    </div>

                    <div className="user-info">
                      <h4>{item?.customer?.name}</h4>
                      <span>{item?.customer?.position}</span>
                    </div>
                    <div className="quote-icon">
                      <ImageWithFallback
                        src={item?.customer?.avatar}
                        alt="quote icon"
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* <div className="load-more">
          <Link href={testimonialsData?.data?.button_url || "#"}>
            <a className="btn">{testimonialsData?.data?.button_text || " "}</a>
          </Link>
        </div> */}
      </Container>
    </div>
  );
};

export default Index;
