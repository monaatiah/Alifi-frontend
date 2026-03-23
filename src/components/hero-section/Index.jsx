import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";
import { useSelector } from "react-redux";
import {
  getComponentByIdentifier,
  ImageWithFallback,
} from "@/helpers/functions";

const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const heroData = getComponentByIdentifier(
    pageData?.page_components,
    "hero_slider",
  );

  return (
    <div className={styles["hero-section"]}>
      <Pattern1 className="pattern-1" />
      <Pattern2 className="pattern-2" />
      <Pattern3 className="pattern-3" />
      <Swiper
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="mySwiper"
        // effect={"fade"}
        lazy={{ loadPrevNext: true, loadPrevNextAmount: 1 }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {heroData?.data?.slides?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <Container>
                <Row className="align-items-center flex-row-reverse">
                  <Col lg={6} xs={12}>
                    <div className="image text-center">
                      <ImageWithFallback
                        src={item?.image}
                        width={500}
                        height={500}
                        alt="Hero Image"
                        priority
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="content d-flex flex-column gap-4">
                      <h1>{item?.title}</h1>
                      <p>{item?.description}</p>
                      <div className="d-flex align-items-center gap-4">
                        <Link href={item?.button1_link || "/"}>
                          <a className="btn">{item?.button1_title}</a>
                        </Link>
                        <Link href={item?.button2_link || "/"}>
                          <a className="btn">{item?.button2_title}</a>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
