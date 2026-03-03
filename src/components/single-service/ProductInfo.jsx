import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import Image from "next/future/image";

import { GoHeart, GoShareAndroid } from "react-icons/go";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { handleImageLink } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import toast from "react-hot-toast";

const ProductInfo = ({ singleProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
            <Col lg={6} xs={12}>
              <div className="product-images">
                <Swiper
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                  spaceBetween={10}
                  className="product-main-image"
                >
                  {singleProduct?.images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          src={handleImageLink(item)}
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
                  slidesPerView={4}
                  modules={[Thumbs]}
                  className="product-thumbs"
                >
                  {singleProduct?.images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <Image
                          src={handleImageLink(item)}
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
            <Col lg={6} xs={12}>
              <div className="product-details">
                <div className="title d-flex justify-content-between align-items-center gap-3">
                  <h1>{singleProduct?.name}</h1>
                  <div className="actions d-flex align-items-center gap-4">
                    <button type="button" aria-label="share button">
                      <GoShareAndroid size={30} />
                    </button>
                    <button type="button" aria-label="favorite button">
                      <GoHeart size={30} />
                    </button>
                  </div>
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
                  <span>{singleProduct?.reviews_count} تقييمات</span>
                </div>
                <div className="price d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-1">
                    {singleProduct?.price}
                    <SaudiRiyalIcon width={30} height={30} stroke="#000" />
                  </div>
                  {singleProduct?.sale_price && (
                    <span className="old-price">
                      {singleProduct?.sale_price}
                      <SaudiRiyalIcon width={30} height={30} stroke="#000" />
                    </span>
                  )}
                </div>
                <div className="description">{singleProduct?.description}</div>
                <div className="quantity d-flex align-items-center gap-3">
                  <button
                    type="button"
                    aria-label="increase quantity"
                    onClick={() => {
                      if (singleProduct?.quantity > quantity) {
                        setQuantity(quantity + 1);
                      } else {
                        toast.error("الكمية المطلوبة غير متوفرة في المخزون");
                      }
                    }}
                  >
                    +
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    aria-label="decrease quantity"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      } else {
                        toast.error("الكمية لا يمكن أن تكون أقل من 1");
                      }
                    }}
                  >
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
                <div className="btns d-flex align-items-center gap-3">
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
