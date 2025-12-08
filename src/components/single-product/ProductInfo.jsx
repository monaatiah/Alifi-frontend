import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Img from "./assets/img.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import Image from "next/future/image";

import { GoHeart, GoShareAndroid, GoStar } from "react-icons/go";

const ProductInfo = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          src={Img}
                          alt="Product Image"
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
                  slidesPerView={4}
                  modules={[Thumbs]}
                  className="product-thumbs"
                >
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          src={Img}
                          alt="Product Thumbnail"
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
                <div className="title d-flex justify-content-between align-items-center gap-3">
                  <h1>شيزر</h1>
                  <div className="actions d-flex align-items-center gap-3">
                    <button type="button" aria-label="share button">
                      <GoShareAndroid />
                    </button>
                    <button type="button" aria-label="favorite button">
                      <GoHeart />
                    </button>
                  </div>
                </div>
                <div className="review d-flex align-items-center gap-3">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="star">
                        <GoStar />
                      </span>
                    ))}
                  </div>
                  <span>12 تقييم</span>
                </div>
                <div className="price">
                  $25.00 <span className="old-price">$30.00</span>
                </div>
                <div className="description">
                  شوربة تونة برية مع اليقطين للقطط البالغة 85 جرام وجبة رطبة
                  صحية عالية الترطيب مصنوعةمن لحوم تونة طبيعية، تساعد في دعم
                  الهضم.
                </div>
                <div className="quantity">
                  <button type="button" aria-label="increase quantity">
                    +
                  </button>
                  <span>1</span>
                  <button type="button" aria-label="decrease quantity">
                    -
                  </button>
                </div>
                <div className="shippment-policy">
                  <h4>سياسة الشحن والإرجاع:</h4>
                  <ul>
                    <li> الشحن خلال 2-4 أيام</li>
                    <li> إمكانية الاسترجاع خلال 7 أيام</li>
                    <li>الدفع عند الاستلام )إن توفر(</li>
                  </ul>
                </div>
                <div className="btns d-flex align-items-center gap-2">
                  <button type="button" className="btn">
                    أضف إلى السلة
                  </button>
                  <button type="button" className="btn">
                    اشتري الآن
                  </button>
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
