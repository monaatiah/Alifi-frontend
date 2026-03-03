import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { GoSearch, GoStarFill } from "react-icons/go";

import Link from "next/link";
import Image from "next/future/image";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";

import FilterIcon from "./assets/filter.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Index = () => {
  const services = useMemo(
    () => [
      {
        id: 1,
        name: "خدمة العناية بالقطط",
        description:
          "تقدم خدمة العناية بالقطط مجموعة من الخدمات المتخصصة في رعاية القطط، بما في ذلك الاستحمام، والتقليم، وتنظيف الأذن، والعناية بالأظافر، والتدليك، والعناية بالفراء. تهدف هذه الخدمة إلى الحفاظ على صحة وجمال القطط، وتوفير بيئة مريحة لها.",
        image: Image1,
        price: 12.0,
        rate: 4.5,
        address: "الرياض، السعودية",
      },
      {
        id: 2,
        name: "خدمة العناية بالكلاب",
        description:
          "تقدم خدمة العناية بالكلاب مجموعة من الخدمات المتخصصة في رعاية الكلاب، بما في ذلك الاستحمام، والتقليم، وتنظيف الأذن، والعناية بالأظافر، والتدليك، والعناية بالفراء. تهدف هذه الخدمة إلى الحفاظ على صحة وجمال الكلاب، وتوفير بيئة مريحة لها.",
        image: Image2,
        price: 15.0,
        rate: 4.0,
        address: "جدة، السعودية",
      },
      {
        id: 3,
        name: "خدمة العناية بالأرانب",
        description:
          "تقدم خدمة العناية بالأرانب مجموعة من الخدمات المتخصصة في رعاية الأرانب، بما في ذلك الاستحمام، والتقليم، وتنظيف الأذن، والعناية بالأظافر، والتدليك، والعناية بالفراء. تهدف هذه الخدمة إلى الحفاظ على صحة وجمال الأرانب، وتوفير بيئة مريحة لها.",
        image: Image3,
        price: 10.0,
        rate: 4.8,
        address: "الدمام، السعودية",
      },
      {
        id: 4,
        name: "خدمة العناية بالطيور",
        description:
          "تقدم خدمة العناية بالطيور مجموعة من الخدمات المتخصصة في رعاية الطيور، بما في ذلك الاستحمام، والتقليم، وتنظيف الأذن، والعناية بالأظافر، والتدليك، والعناية بالريش. تهدف هذه الخدمة إلى الحفاظ على صحة وجمال الطيور، وتوفير بيئة مريحة لها.",
        image: Image1,
        price: 8.0,
        rate: 4.2,
        address: "الرياض، السعودية",
      },
    ],
    [],
  );

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <div className="shop-filter d-flex justify-content-between align-items-center gap-3">
          <div className="inputs-wrap d-flex align-items-center gap-3">
            <div className="search">
              <button type="button" aria-label="search button">
                <GoSearch color="#fff" />
              </button>
              <input
                type="search"
                className="form-control"
                placeholder="ابحث...."
              />
            </div>
            <select
              className="form-select form-control"
              aria-label="Default select example"
            >
              <option selected>فرز حسب</option>
              <option value="1">الأحدث</option>
              <option value="2">الأقدم</option>
              <option value="3">الأعلى سعراً</option>
              <option value="4">الأقل سعراً</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-3 btns">
            <button type="submit" className="btn" aria-label="submit">
              ابحث
            </button>
            <button
              type="button"
              className="filter-btn"
              aria-label="filter button"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
        {showFilter && (
          <div className="filter-wrap d-flex align-items-center gap-3">
            <div className="item">
              <select className="form-select form-control">
                <option selected>الفئة</option>
                <option value="1">طعام القطط</option>
                <option value="2">لعب القطط</option>
                <option value="3">طعام الكلاب</option>
                <option value="4">لعب الكلاب</option>
              </select>
            </div>
            <div className="item">
              <select className="form-select form-control">
                <option selected>السعر</option>
                <option value="1">0 - 50</option>
                <option value="2">50 - 100</option>
                <option value="3">100 - 200</option>
                <option value="4">200 - 500</option>
              </select>
            </div>
            <div className="item">
              <select className="form-select form-control">
                <option selected>التقييم</option>
                <option value="1">1 نجمة</option>
                <option value="2">2 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="5">5 نجوم</option>
              </select>
            </div>
          </div>
        )}

        <div className="services-wrap">
          <Row>
            {services.map((service, idx) => (
              <Col lg={4} md={6} sm={12} key={idx}>
                <div className="service-item d-flex align-items-center gap-3">
                  <div className="right d-flex flex-column gap-3 align-items-center">
                    <div className="img">
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="rate">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="star">
                          <GoStarFill
                            color={
                              index < Math.round(service.rate)
                                ? "#f2782b"
                                : "#000"
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="left">
                    <div className="title">
                      <Link href={`/services/${service.id}`}>
                        <a>{service.name}</a>
                      </Link>
                    </div>
                    <div className="desc">
                      <p>
                        {service.description.length > 50
                          ? service.description.substring(0, 50) + "..."
                          : service.description}
                      </p>
                    </div>
                    <div className="extra d-flex align-items-center gap-3 justify-content-between">
                      <div>
                        <div className="vendor">
                          مقدم الخدمة:
                          <span>علي فهد</span>
                        </div>
                        <div className="address">
                          العنوان:
                          <span>{service.address}</span>
                        </div>
                      </div>
                      <Link href={`/services/${service.id}`}>
                        <a aria-label="view details">عرض التفاصيل</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="global-pagination">
            <ul>
              <li>
                <button
                  type="button"
                  aria-label="previous page"
                  className="action-btn"
                >
                  <FaArrowRight />
                </button>
              </li>
              <li>
                <button type="button" className="active" aria-label="page 1">
                  1
                </button>
              </li>
              <li>
                <button type="button" aria-label="page 2">
                  2
                </button>
              </li>
              <li>
                <button type="button" aria-label="page 3">
                  3
                </button>
              </li>
              <li>
                <button type="button" aria-label="page 4">
                  4
                </button>
              </li>
              <li>
                <button type="button" aria-label="page 5">
                  5
                </button>
              </li>

              <li>
                <button
                  type="button"
                  aria-label="next page"
                  className="action-btn next-btn"
                >
                  <FaArrowLeft />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="extra-services">
          <Row>
            <Col md={6} lg={4}>
              <div className="service-block">
                <div className="img">
                  <Image
                    src={Image1}
                    alt="service image"
                    width={325}
                    height={325}
                  />
                </div>
                <div className="info">
                  <h3>البحث عن أفضل غذاء</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                    هذا النص{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="service-block">
                <div className="img">
                  <Image
                    src={Image1}
                    alt="service image"
                    width={325}
                    height={325}
                  />
                </div>
                <div className="info">
                  <h3>البحث عن أفضل غذاء</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                    هذا النص{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="service-block">
                <div className="img">
                  <Image
                    src={Image1}
                    alt="service image"
                    width={325}
                    height={325}
                  />
                </div>
                <div className="info">
                  <h3>البحث عن أفضل غذاء</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل
                    هذا النص{" "}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
