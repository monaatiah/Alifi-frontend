import React, { useState } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import Image from "next/future/image";

import { GoHeart, GoShareAndroid } from "react-icons/go";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { handleImageLink, ImageWithFallback } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, addToCart } from "@/store/actions";
import { useRouter } from "next/router";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

const ProductInfo = ({ singleProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(singleProduct?.quantity > 0 ? 1 : 0);

  const { loading } = useSelector((state) => state.cart || {});

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

  const handleAddToCart = () => {
    dispatch(
      addToCart({ cookies: {}, productId: singleProduct?.id, quantity }),
    );
  };

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="product-info">
      <Container>
        <div className="inner">
          <Row>
            <Col lg={6} xs={12}>
              <div className="product-images">
                {singleProduct?.images?.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="single-image">
                    <ImageWithFallback
                      src={singleProduct?.image}
                      alt={singleProduct?.name || "Product Image"}
                      width={420}
                      height={370}
                    />
                  </div>
                )}
              </div>
            </Col>
            <Col lg={6} xs={12}>
              <div className="product-details">
                <div className="title d-flex justify-content-between align-items-center gap-3">
                  <h1>{singleProduct?.name}</h1>
                  <div className="actions d-flex align-items-center gap-4">
                    <div className="share">
                      <button
                        type="button"
                        aria-label="share button"
                        onClick={() => setShowShareOptions(!showShareOptions)}
                      >
                        <GoShareAndroid size={30} />
                      </button>
                      <div
                        className={`share-list d-flex align-items-center flex-column gap-2 ${showShareOptions ? "active" : ""}`}
                      >
                        <button
                          type="button"
                          aria-label="share on facebook"
                          onClick={() => handleShare("facebook")}
                        >
                          <FaFacebook />
                        </button>
                        <button
                          type="button"
                          aria-label="share on twitter"
                          onClick={() => handleShare("twitter")}
                        >
                          <FaXTwitter />
                        </button>
                        <button
                          type="button"
                          aria-label="share on whatsapp"
                          onClick={() => handleShare("whatsapp")}
                        >
                          <FaWhatsapp />
                        </button>
                        <button
                          type="button"
                          aria-label="share on linkedin"
                          onClick={() => handleShare("linkedin")}
                        >
                          <FaLinkedin />
                        </button>
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`tooltip-copy`}>نسخ الرابط</Tooltip>
                          }
                        >
                          <button
                            type="button"
                            aria-label="copy link"
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                navigator.clipboard.writeText(
                                  window.location.href,
                                );
                                toast.success("تم نسخ الرابط");
                              }
                            }}
                          >
                            <IoCopyOutline />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="favorite button"
                      onClick={() => {
                        dispatch(
                          addProductToWishlist({
                            cookies: {},
                            product_id: singleProduct?.id,
                          }),
                        );
                      }}
                    >
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
                {singleProduct?.quantity > 0 && (
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
                )}
                {/* <div className="shippment-policy">
                  <h4>سياسة الشحن والإرجاع:</h4>
                  <ul>
                    <li> الشحن خلال 2-4 أيام</li>
                    <li> إمكانية الاسترجاع خلال 7 أيام</li>
                    <li>الدفع عند الاستلام )إن توفر(</li>
                  </ul>
                </div> */}
                {singleProduct?.quantity > 0 && (
                  <div className="btns d-flex align-items-center gap-3">
                    <button
                      type="button"
                      className="btn"
                      aria-label="add to cart"
                      onClick={handleAddToCart}
                      disabled={loading || singleProduct?.quantity === 0}
                    >
                      أضف إلى السلة
                    </button>
                    <button
                      type="button"
                      className="btn"
                      aria-label="buy now"
                      onClick={() => {
                        handleAddToCart();
                        router.push("/checkout");
                      }}
                      disabled={loading || singleProduct?.quantity === 0}
                    >
                      اشتري الآن
                    </button>
                  </div>
                )}

                {singleProduct?.quantity === 0 && (
                  <div className="out-of-stock">
                    <span>غير متوفر في المخزون</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProductInfo;
