import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Img1 from "./assets/games.png";
import Img2 from "./assets/dogs-food.png";
import Img3 from "./assets/cats-food.png";
import Img4 from "./assets/accessorires.png";
import Image from "next/future/image";
import Link from "next/link";

import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";

const Index = () => {
  const data = [
    {
      id: 1,
      name: "ألعاب",
      img: Img1,
    },
    {
      id: 2,
      name: "طعام الكلاب",
      img: Img2,
    },
    {
      id: 3,
      name: "طعام القطط",
      img: Img3,
    },
    {
      id: 4,
      name: "إكسسوارات",
      img: Img4,
    },
    {
      id: 2,
      name: "طعام الكلاب",
      img: Img2,
    },
  ];
  return (
    <div className={styles["shop-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle={"تسوّق الأفضل لحيوانك الأليف"}
          secTitle={"السوق الإلكتروني"}
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
              1366: {
                slidesPerView: 3,
              },
              1920: {
                slidesPerView: 4,
              },
            }}
          >
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="block">
                  <Link href={`/shop/products/${item?.id}`} passHref>
                    <a aria-label={item?.name}></a>
                  </Link>
                  <div className="icon">
                    <Image
                      src={item?.img}
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
          <Link href="/shop/products" passHref>
            <a className="btn">تصفّح جميع المنتجات</a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Index;
