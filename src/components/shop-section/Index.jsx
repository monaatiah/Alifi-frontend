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
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation={true}
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
                  <a></a>
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
