import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";

const Index = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <div className={styles["services-section"]}>
      <Container>
        <div className="services-list">
          <Swiper
            spaceBetween={40}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1.7,
                spaceBetween: 15,
              },
              625: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1366: {
                slidesPerView: 4,
              },
              1920: {
                slidesPerView: 5,
              },
            }}
          >
            {categories?.data?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="service-block">
                  <div className="img">
                    <Image
                      src={handleImageLink(item?.icon)}
                      alt={item?.name}
                      width={325}
                      height={325}
                    />
                    <Link href={`/categories/${item?.slug}`}>
                      <a> </a>
                    </Link>
                  </div>
                  <div className="info">
                    <h3>
                      <Link href={`/categories/${item?.slug}`}>
                        <a>{item?.name}</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Index;
