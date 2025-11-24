import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Img1 from "./assets/b1.png";
import Img2 from "./assets/b2.png";
import { v4 } from "uuid";
import Image from "next/future/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const Index = () => {
  const data = [
    {
      id: v4(),
      img: Img1,
      title: "الرعاية المنزلية",
    },
    {
      id: v4(),
      img: Img2,
      title: "الاستشارات الغذائية",
    },
    {
      id: v4(),
      img: Img1,
      title: "العناية والتجميل",
    },
    {
      id: v4(),
      img: Img2,
      title: "التدريب والسلوك",
    },
    {
      id: v4(),
      img: Img1,
      title: "الرعاية المنزلية",
    },
  ];

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
                slidesPerView: 2,
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
            {data?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="service-block">
                  <div className="img">
                    <Image
                      src={item?.img}
                      alt={item.title}
                      width={325}
                      height={325}
                    />
                    <Link href={`/services/${item?.id}`}>
                      <a> </a>
                    </Link>
                  </div>
                  <div className="info">
                    <h3>
                      <Link href={`/services/${item?.id}`}>
                        <a>{item.title}</a>
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
