import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiClock1, CiMobile3 } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { postFormSubmission } from "@/store/actions";
import {
  getComponentByIdentifier,
  ImageWithFallback,
} from "@/helpers/functions";

const Index = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { settings, formSchema, pageData } = useSelector(
    (state) => state.settings,
  );
  const prizesData = getComponentByIdentifier(
    pageData?.page_components,
    "prizes",
  );

  const onSubmit = (data) => {
    dispatch(
      postFormSubmission({
        data,
        slug: formSchema?.slug,
        reset: reset,
      }),
    );
  };

  return (
    <div className={styles["contact-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle="نحن نحب أن نسمع منك"
          secTitle="رعاية الحيوانات الأليفة من قبل خبراء"
        />
        <div className="top">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <MdOutlineMailOutline />
                </div>
                <div className="info">
                  <h4>البريد الإلكتروني</h4>
                  <p>
                    <Link
                      href={`mailto:${settings?.contact_email?.split("/")[4]}`}
                    >
                      <a> {settings?.contact_email?.split("/")[4]}</a>
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <CiMobile3 />
                </div>
                <div className="info">
                  <h4> رقم التليفون</h4>
                  <p className="d-flex flex-column gap-1">
                    <Link
                      href={`tel:${settings?.contact_phone?.split("/")[4]}`}
                    >
                      <a>{settings?.contact_phone?.split("/")[4]}</a>
                    </Link>
                    <span>خدمة عملاء متاحة 24/7 للرد على استفساراتك</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="block">
                <div className="icon">
                  <CiClock1 />
                </div>
                <div className="info">
                  <h4> ساعات العمل</h4>
                  <p className="d-flex flex-column gap-1">
                    <span>
                      {
                        settings?.static_strings?.find(
                          (str) => str?.key === "workTimes",
                        )?.value
                      }
                    </span>
                    <span>
                      {
                        settings?.static_strings?.find(
                          (str) => str?.key === "workDays",
                        )?.value
                      }
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={6} sm={12}>
            <div className="addresses">
              <ul>
                <li>
                  <h4>
                    <FaMapMarkerAlt />
                    المقر الرئيسي :
                  </h4>
                  <p>
                    123 شارع الحيوانات الأليفة، مدينة الحيوان، دولة الحيوان
                    45678
                  </p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="contact-form">
              <h3>احجز مكانك أو اكتشف المزيد</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  {formSchema?.fields?.map((field) => (
                    <Col lg={12} key={field?.id}>
                      <div className="form-group">
                        {field?.type === "textarea" ? (
                          <textarea
                            placeholder={field?.label}
                            className="form-control"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          />
                        ) : field?.type === "select" ? (
                          <select
                            className="form-control form-select"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          >
                            <option value="">اختر خيارًا</option>
                            {field?.options?.map((option, index) => (
                              <option value={option?.value} key={index}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field?.type}
                            placeholder={field?.label}
                            className="form-control"
                            {...register(field?.key, {
                              required: field?.required,
                            })}
                          />
                        )}
                        {errors[field?.key] && (
                          <p className="error">
                            {errors[field?.key]?.type === "required" &&
                              "هذا الحقل مطلوب"}
                            {errors[field?.key]?.type === "pattern" &&
                              errors[field?.key]?.message}
                          </p>
                        )}
                      </div>
                    </Col>
                  ))}
                  <Col lg={12}>
                    <div className="form-group d-flex justify-content-end">
                      <button type="submit" className="btn">
                        أرسل الرسالة
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>

        <div className="awards">
          <h3>{prizesData?.data?.title || ""}</h3>
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            pagination={{ dynamicBullets: true, clickable: true }}
            navigation={{
              nextEl: ".award-next",
              prevEl: ".award-prev",
            }}
            // autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
              1366: {
                slidesPerView: 4,
              },
              1920: {
                slidesPerView: 4,
              },
            }}
          >
            {prizesData?.data?.items?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="award-item">
                  <ImageWithFallback
                    src={item?.image}
                    alt={item?.title}
                    width={170}
                    height={170}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="sw-navigation d-flex align-items-center justify-content-center">
            <button className="award-prev" aria-label="previous button">
              <ArrowRightIcon />
            </button>
            <button className="award-next" aria-label="next button">
              <ArrowLeftIcon />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;
