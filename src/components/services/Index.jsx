import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import SecMainTitle from "../Shared/SecMainTitle";
import Img1 from "./assets/b1.png";
import Img2 from "./assets/b2.png";
import { v4 } from "uuid";
import Image from "next/future/image";
import Link from "next/link";

const Index = () => {
  const data = [
    {
      id: v4(),
      img: Img1,
      title: "الرعاية المنزلية",
      desc: "مقدّمو رعاية موثوقون أثناء غيابك.",
    },
    {
      id: v4(),
      img: Img2,
      title: "الاستشارات الغذائية",
      desc: "نصائح وخطط تغذية بإشراف مختصين.",
    },
    {
      id: v4(),
      img: Img1,
      title: "العناية والتجميل",
      desc: "تنظيف، قص شعر، والعناية بالأظافر.",
    },
    {
      id: v4(),
      img: Img2,
      title: "التدريب والسلوك",
      desc: "تدريب الحيوانات على الطاعة والسلوك الإيجابي.",
    },
  ];
  return (
    <div className={styles["services-section"]}>
      <Container>
        <SecMainTitle
          secSubTitle={"عرض لأهم الخدمات المتوفرة من مقدّمي الخدمات في المنصة."}
          secTitle="خدمات لرعاية وسعادة حيوانك الأليف"
        />
        <Row>
          {data?.map((item) => (
            <Col key={item.id} md={6} lg={3}>
              <div className="block">
                <div className="img">
                  <Image
                    src={item?.img}
                    alt={item.title}
                    width={325}
                    height={325}
                  />
                </div>
                <div className="info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link href={`/services/${item?.id}`}>
                    <a>اعرف المزيد</a>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
