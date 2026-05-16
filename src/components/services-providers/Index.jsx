import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { GoStarFill } from "react-icons/go";

import Link from "next/link";
import Image from "next/future/image";

import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";

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

  const { singleService } = useSelector((state) => state.services);

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <div className="section-head d-flex align-items-center gap-3 justify-content-between">
          <h3>مقدمو نفس الفئة</h3>
        </div>
        <div className="services-wrap">
          <Row>
            {singleService?.related_service_providers?.length > 0 ? (
              singleService.related_service_providers.map((provider, idx) => (
                <Col xxl={4} lg={6} md={6} sm={12} key={idx}>
                  <div className="service-item d-flex align-items-center gap-3">
                    <div className="right d-flex flex-column gap-3 align-items-center">
                      <div className="img">
                        <Image
                          src={handleImageLink(provider?.logo_url) || ""}
                          alt={provider?.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="rate">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className="star">
                            <GoStarFill
                              color={
                                index < Math.round(provider?.rate)
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
                        <Link href={`/services/providers/${provider?.slug}`}>
                          <a>{provider?.name}</a>
                        </Link>
                      </div>
                      <div className="desc">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: provider?.short_description,
                          }}
                        />
                      </div>
                      <div className="extra d-flex align-items-center gap-3 justify-content-between">
                        <div>
                          <div className="address">
                            العنوان:
                            <span>{provider?.address}</span>
                          </div>
                        </div>
                        <Link href={`/services/${provider?.slug}`}>
                          <a aria-label="view details">عرض التفاصيل</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p>لا يوجد مقدمي خدمات لنفس الفئة</p>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
