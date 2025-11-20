import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import HeroImg from "./assets/hero.png";
import Image from "next/future/image";
import Pattern1 from "./assets/1.svg";
import Pattern2 from "./assets/2.svg";
import Pattern3 from "./assets/3.svg";

const Index = () => {
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
        effect={"fade"}
        lazy={{ loadPrevNext: true, loadPrevNextAmount: 1 }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="item">
            <Container>
              <Row className="align-items-center flex-row-reverse">
                <Col lg={6} xs={12}>
                  <div className="image">
                    <Image
                      src={HeroImg}
                      width={500}
                      height={500}
                      alt="Hero Image"
                      priority
                    />
                  </div>
                </Col>
                <Col lg={6} xs={12}>
                  <div className="content d-flex flex-column  gap-4">
                    <h1>كل ما يحتاجه حيوانك الأليف... في مكان واحد!</h1>
                    <p>
                      اكتشف منتجات، مقالات، ونصائح من خبراء الحيوانات الأليفة.في
                      أليفي، نهتم بصحتهم وسعادتهم كما لو كانوا جزءًا من عائلتنا
                    </p>
                    <div className="d-flex align-items-center gap-4">
                      <Link href="/services">
                        <a className="btn">تعرّف على خدماتنا</a>
                      </Link>
                      <Link href="/shop">
                        <a className="btn">استكشف السوق</a>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <Container>
              <Row className="align-items-center flex-row-reverse">
                <Col lg={6} xs={12}>
                  <div className="image">
                    <Image
                      src={HeroImg}
                      width={500}
                      height={500}
                      alt="Hero Image"
                      priority
                    />
                  </div>
                </Col>
                <Col lg={6} xs={12}>
                  <div className="content d-flex flex-column  gap-4">
                    <h1>كل ما يحتاجه حيوانك الأليف... في مكان واحد!</h1>
                    <p>
                      اكتشف منتجات، مقالات، ونصائح من خبراء الحيوانات الأليفة.في
                      أليفي، نهتم بصحتهم وسعادتهم كما لو كانوا جزءًا من عائلتنا
                    </p>
                    <div className="d-flex align-items-center gap-4">
                      <Link href="/services">
                        <a className="btn">تعرّف على خدماتنا</a>
                      </Link>
                      <Link href="/shop">
                        <a className="btn">استكشف السوق</a>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Index;
