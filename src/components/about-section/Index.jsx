import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Icon1 from "./assets/1.png";
import Icon2 from "./assets/2.png";
import Icon3 from "./assets/3.png";
import Icon4 from "./assets/4.png";
import Image from "next/future/image";

const Index = () => {
  const data = [
    {
      title: "سوق شامل لمستلزمات الحيوانات الأليفة",
      icon: Icon1,
    },
    {
      title: "مقالات ومحتوى تثقيفي موثوق",
      icon: Icon2,
    },
    {
      title: "مجتمع يهتم بمشاركة الخبرة والمعرفة",
      icon: Icon3,
    },
    {
      title: "تجربة تصفح سهلة وممتعة",
      icon: Icon4,
    },
  ];
  return (
    <div className={styles["about-section"]}>
      <Container>
        <div className="sec-head">
          <h1>من نحن</h1>
          <p>
            أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق
            الحيوانات الأليفة. نساعدك على اختيار الأفضل لحيوانك الأليف، من
            منتجات مضمونة ومحتوى موثوق يقدمها خبراء في العناية والتغذية
          </p>
        </div>
        <Row>
          {data?.map((item, index) => (
            <Col lg={3} md={6} sm={12} key={index}>
              <div className="item">
                <div className="icon">
                  <Image
                    src={item?.icon}
                    alt={item?.title}
                    width={100}
                    height={70}
                  />
                </div>
                <h2>{item?.title}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
