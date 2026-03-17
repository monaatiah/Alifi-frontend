import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import Image from "next/future/image";

import { GoHeart, GoShareAndroid } from "react-icons/go";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import SliderImg from "./assets/img.png";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";

const ProductInfo = ({ singleProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const rating = Number(singleProduct?.reviews_avg_rating ?? 0);
  const normalizedRating = Math.max(0, Math.min(5, rating));
  const roundedRating = Math.round(normalizedRating * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (roundedRating >= starValue) {
      return "full";
    }

    if (roundedRating >= starValue - 0.5) {
      return "half";
    }

    return "empty";
  });

  return (
    <div className="product-info">
      <Container>
        <div className="inner">
          <Row>
            <Col lg={5} xs={12}>
              <div className="product-images">
                <Swiper
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                  spaceBetween={10}
                  className="product-main-image"
                >
                  {[1, 2, 3]?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          // src={handleImageLink(item)}
                          src={SliderImg}
                          alt={singleProduct?.name || "Product Image"}
                          width={420}
                          height={370}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={3}
                  modules={[Thumbs]}
                  className="product-thumbs"
                >
                  {[1, 2, 3]?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          // src={handleImageLink(item)}
                          src={SliderImg}
                          alt={singleProduct?.name || "Product Image"}
                          width={100}
                          height={90}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
            <Col lg={7} xs={12}>
              <div className="product-details">
                <div className="title">
                  <div className="actions d-flex align-items-center gap-4">
                    <button type="button" aria-label="favorite button">
                      <GoHeart size={30} />
                    </button>
                    <button type="button" aria-label="share button">
                      <GoShareAndroid size={30} />
                    </button>
                  </div>
                  <h1>عنوان الخدمة</h1>
                </div>
                <div className="review d-flex align-items-center gap-3">
                  <div className="stars d-flex align-items-center gap-1">
                    {stars.map((type, index) => (
                      <span key={index} className="star">
                        {type === "full" && <FaStar color="#000" />}
                        {type === "half" && (
                          <FaStarHalfAlt
                            color="#000"
                            style={{ transform: "scaleX(-1)" }}
                          />
                        )}
                        {type === "empty" && <FaStar color="#000" />}
                      </span>
                    ))}
                  </div>
                  <span>12 تقييمات</span>
                </div>
                <div className="location d-flex align-items-center gap-3">
                  <div className="icon">
                    <FiMapPin />
                  </div>
                  <span>الرياض، السعودية</span>
                </div>
                <div className="description">
                  <p>
                    متجر متخصص في منتجات العناية بالقطط متجر متخصص في منتجات
                    العناية بالقطط
                  </p>
                </div>
                <div className="price-range">
                  <h4>النطاق السعري</h4>

                  <p className="d-flex align-items-center gap-2">
                    <span>
                      150
                      <SaudiRiyalIcon width={20} height={20} stroke="#7267C3" />
                    </span>
                    -
                    <span>
                      300
                      <SaudiRiyalIcon width={20} height={20} stroke="#7267C3" />
                    </span>
                  </p>
                </div>
                <div className="btns d-flex align-items-center justify-content-between">
                  <button type="button" className="btn">
                    احصل على الموقع
                  </button>
                  <Link href="https://wa.me/966123456789">
                    <a
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      اتصل الآن
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProductInfo;
