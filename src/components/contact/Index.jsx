import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiClock1, CiMobile3 } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import AwardImg from "./assets/awards.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/future/image";
import ArrowRightIcon from "./assets/arrow-right.svg";
import ArrowLeftIcon from "./assets/arrow-left.svg";

const Index = () => {
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
                    <Link href="mailto:info@domain.com">
                      <a>info@domain.com</a>
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
                    <Link href="tel:+09 121 359 6224">
                      <a>+09 121 359 6224</a>
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
                    <span>9:00 AM - 5:00 PM</span>
                    <span>
                      الاثنين - الجمعة &nbsp;|&nbsp; السبت - الأحد: مغلق
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={6} sm={12}>
            <div className="subscribe">
              <h3>ابحث عن شخص يمشي كلبك أو يهتم بالحيوانات الأليفة</h3>
              <div className="form-group">
                <input type="email" placeholder="أدخل بريدك الإلكتروني" />
                <button type="submit" className="btn">
                  اشترك
                </button>
              </div>
            </div>
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
                <li>
                  <h4>
                    <FaMapMarkerAlt />
                    فرع المكتب :
                  </h4>
                  <p>789 شارع الحيوانات، مدينة الحيوان، دولة الحيوان 12345</p>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="contact-form">
              <h3>احجز مكانك أو اكتشف المزيد</h3>
              <form>
                <Row>
                  <Col lg={12}>
                    <div className="form-group">
                      <div className="d-flex align-items-center gap-4">
                        <label>
                          <input type="radio" name="type" />
                          كلب
                        </label>
                        <label>
                          <input type="radio" name="type" />
                          قطة
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="اسمك الكامل"
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="عنوان بريدك الإلكتروني"
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="رقم الهاتف"
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="form-group">
                      <select className="form-select form-control">
                        <option>اختر الخدمة</option>
                        <option value="1">المشي مع الكلاب</option>
                        <option value="2">رعاية الحيوانات الأليفة</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="form-group">
                      <textarea
                        rows="4"
                        placeholder="اكتب رسالتك هنا..."
                        className="form-control"
                      ></textarea>
                    </div>
                  </Col>
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
          <h3>الشركة الحائزة على جوائز</h3>
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
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="award-item">
                <Image src={AwardImg} alt="Award" width={170} height={170} />
              </div>
            </SwiperSlide>
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
