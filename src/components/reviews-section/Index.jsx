import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { FaStar } from "react-icons/fa";
import { Autoplay, Navigation } from "swiper";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";

const Index = () => {
  const data = [
    {
      id: v4(),
      name: "لوربيم ابسوم",
      jobTitle: "مستشار صحي",
      review: "المقالات ساعدتني أفهم سلوك كلبي الجديد",
      rate: 4,
    },
    {
      id: v4(),
      name: "لوربيم ابسوم",
      jobTitle: "مستشار صحي",
      review: "«اشتريت طعامًا لقطتي ووصل بسرعة وجودته ممتازة!»",
      rate: 5,
    },
    {
      id: v4(),
      name: "لوربيم ابسوم",
      jobTitle: "مستشار صحي",
      review: "المقالات ساعدتني أفهم سلوك كلبي الجديد",
      rate: 4,
    },
  ];

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
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="block">
                <div className="rate">
                  {[...Array(item.rate)].map((_, idx) => (
                    <FaStar key={idx} color="#CFFD55" size={20} />
                  ))}
                </div>
                <div className="desc">
                  <p>{item.review}</p>
                </div>

                <div className="user-info">
                  <h4>{item.name}</h4>
                  <span>{item.jobTitle}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="load-more">
          <Link href="/reviews">
            <a className="btn">شارك تجربتك</a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Index;
