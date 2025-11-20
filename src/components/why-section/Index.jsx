import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Img1 from "./assets/1.png";
import Img2 from "./assets/2.png";
import Img3 from "./assets/3.png";
import Img4 from "./assets/4.png";
import { v4 } from "uuid";
import Image from "next/future/image";
import SecMainTitle from "../Shared/SecMainTitle";

const Index = () => {
  const data = [
    {
      id: v4(),
      image: Img1,
      title: "منتجات مضمونة الجودة",
    },
    {
      id: v4(),
      image: Img2,
      title: "محتوى موثوق من مختصين",
    },
    {
      id: v4(),
      image: Img3,
      title: "جربة تصفح سهلة وسريعة",
    },
    {
      id: v4(),
      image: Img4,
      title: "مجتمع يشاركك الشغف برعاية الحيوانات",
    },
  ];
  return (
    <div className={styles["why-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle="لماذا أليفي هو خيارك الأول؟"
          secTitle="لماذا تختار أليفي؟"
        />
        <Row>
          {data?.map((item) => (
            <Col key={item.id} md={6} lg={3}>
              <div className="block">
                <div className="img">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    width={120}
                    height={120}
                  />
                </div>
                <h3>{item?.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
