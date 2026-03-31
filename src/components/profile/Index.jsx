import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";

import CallIcon from "./assets/phone.svg";
import ChatIcon from "./assets/chat.svg";
import WhatsAppIcon from "./assets/whatsapp.svg";
import AvatarIcon from "./assets/dog.png";
import ServiceImg from "./assets/service.png";
import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";
import ProductBlock from "@/components/Shared/ProductBlock";

const Index = () => {
  const products = useMemo(
    () => [
      {
        id: "prod-1",
        name: "Rosquillas Caseras para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 12.0,
        category: { id: "cat-1", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-2",
        name: "Juguete Interactivo para Gatos",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image2,
        price: 18.5,
        category: { id: "cat-2", name: "لوازم" },
      },
      {
        id: "prod-3",
        name: "Cama Cómoda para Mascotas",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image3,
        price: 25.0,
        category: { id: "cat-3", name: "طعام" },
      },
      {
        id: "prod-4",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-4", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-5",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-5", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-6",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-6", name: "الألعاب والإكسسوارات" },
      },
      {
        id: "prod-7",
        name: "Alimento Natural para Perros",
        description:
          "أليفي منصة إلكترونية تجمع بين التسوق الذكي والمعرفة المتخصصة لعشّاق الحيوانات الأليفة",
        image: Image1,
        price: 30.0,
        category: { id: "cat-7", name: "الألعاب والإكسسوارات" },
      },
    ],
    [],
  );

  return (
    <div className={styles["profile-section"]}>
      <Container>
        <div className="author-wrap d-flex align-items-start gap-3 justify-content-between">
          <div className="author d-flex align-items-center gap-3">
            <div className="img">
              <Image src={AvatarIcon} alt="author" width={110} height={110} />
            </div>
            <div className="info">
              <h3>Pet Vet Clinic Services</h3>
              <p>الرياض - المملكة العربية السعودية</p>
              <div className="rating d-flex align-items-center gap-4">
                15 تقييم
                <div className="stars d-flex align-items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      <GoStarFill color="#000" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="action-btns d-flex align-items-center gap-4">
            <Link href={`/profile`}>
              <a className="btn">زيارة الموقع</a>
            </Link>
            <div className="icons d-flex align-items-center gap-2">
              <Link href={`tel:+966555555555`}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <CallIcon />
                </a>
              </Link>
              <Link href={`mailto:mail@info.com`}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <ChatIcon />
                </a>
              </Link>
              <Link href={`https://wa.me/966555555555`}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <WhatsAppIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="description">
          <h1>هذا النص هو مثال لنص</h1>
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
            المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
            تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق.هذا النص هو مثال لنص يمكن أن يستبدل في
            نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
            تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق.إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p>
        </div>
        <div className="services">
          <h2>الخدمات</h2>
          <Row>
            {Array.from({ length: 4 }).map((_, idx) => {
              return (
                <Col lg={3} md={4} xs={6} key={idx}>
                  <div className="service-item">
                    <div className="img">
                      <Image
                        src={ServiceImg}
                        alt="service"
                        width={140}
                        height={140}
                      />
                    </div>
                    <div className="info">
                      <h3>استشارة بيطرية</h3>
                      <p>استشارة طبية شاملة لحيوانك الأليف</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="products">
          <h2>المنتجات</h2>
          <Row>
            {products?.map((product, idx) => {
              return (
                <Col lg={3} md={4} xs={12} key={idx}>
                  <ProductBlock item={product} />
                </Col>
              );
            })}
          </Row>
          <div className="load-more">
            <button className="btn"> إظهار الكل</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Index;
