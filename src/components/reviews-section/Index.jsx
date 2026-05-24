import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { Autoplay, Navigation } from "swiper";
import { useSelector } from "react-redux";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";

import { getComponentByIdentifier, ImageWithFallback } from "@/helpers/functions";

const Index = ({ data, identifier = "testimonials" }) => {
  const { pageData } = useSelector((state) => state.settings);
  const { singleService } = useSelector((state) => state.services || {});
  const serviceData =
    singleService?.id != null ? singleService : (singleService?.data ?? singleService);
  const serviceReviews = Array.isArray(serviceData?.reviews)
    ? serviceData.reviews
    : null;
  const isServiceReviewsSection = Boolean(serviceData?.id && serviceReviews);
  const cmsBlock = getComponentByIdentifier(pageData?.page_components, identifier);
  const sectionData = isServiceReviewsSection
    ? { title: "تقييمات الخدمة" }
    : data || cmsBlock?.data || {};
  const items = isServiceReviewsSection
    ? serviceReviews
    : Array.isArray(sectionData?.items)
      ? sectionData.items
      : Array.isArray(data)
        ? data
        : [];

  return (
    <div className={styles["reviews-section"]}>
      <Container className="position-relative">
        <div className="sec-head">
          <h3>{sectionData?.title || "آراء المستخدمين"}</h3>
          <div className="sw-navigation d-flex align-items-center gap-3">
            <button className="sw-prev" aria-label="previous button">
              <ArrowRightIcon />
            </button>
            <button className="sw-next" aria-label="next button">
              <ArrowLeftIcon />
            </button>
          </div>
        </div>

        {items.length > 0 ? (
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            navigation={{
              nextEl: ".sw-next",
              prevEl: ".sw-prev",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
          >
            {items.map((item, idx) => {
              const stars = Math.max(
                0,
                Math.min(5, Math.round(Number(item?.data?.rating ?? item?.rating ?? item?.rate ?? 0))),
              );
              const text =
                item?.body ||
                item?.comment ||
                item?.review ||
                item?.description ||
                item?.title ||
                "";
              const customerName =
                item?.data?.customer_name ||
                item?.customer?.name ||
                item?.user?.name ||
                item?.name ||
                item?.title ||
                "مستخدم";
              const customerRole =
                item?.data?.position || item?.customer?.email || item?.slug || "";
              const customerImage =
                item?.data?.customer_image ||
                item?.customer?.avatar ||
                item?.user?.avatar ||
                item?.image ||
                "";

              return (
                <SwiperSlide key={item?.id || item?.slug || idx}>
                  <div className="block">
                    <div className="rate">
                      {[...Array(stars)].map((_, starIndex) => (
                        <FaStar key={starIndex} color="#CFFD55" size={20} />
                      ))}
                    </div>
                    <div className="desc">
                      <p>{text}</p>
                    </div>

                    <div className="user-info">
                      <h4>{customerName}</h4>
                      <span>{customerRole}</span>
                    </div>
                    {customerImage && (
                      <div className="quote-icon">
                        <ImageWithFallback
                          src={customerImage}
                          alt={customerName}
                          width={60}
                          height={60}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="empty-reviews">لا توجد تقييمات لهذه الخدمة بعد.</div>
        )}

        {/* <div className="load-more">
          <Link href={testimonialsData?.data?.button_url || "#"}>
            <a className="btn">{testimonialsData?.data?.button_text || " "}</a>
          </Link>
        </div> */}
      </Container>
    </div>
  );
};

export default Index;
