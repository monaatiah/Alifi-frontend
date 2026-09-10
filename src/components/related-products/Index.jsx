import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Link from "next/link";
import ProductBlock from "./ProductBlock";
import Image1 from "./assets/1.png";
import Image2 from "./assets/2.png";
import Image3 from "./assets/3.png";

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
    ],
    [],
  );

  return (
    <div className={styles["products-section"]}>
      <Container>
        <h2 className="d-flex align-items-center gap-3 justify-content-between">
          المنتجات ذات الصلة
          <Link href="/shop" className="btn">
            إظهار الكل
          </Link>
        </h2>
        <Row>
          {products?.map((product, idx) => {
            return (
              <Col lg={3} md={4} xs={12} key={idx}>
                <ProductBlock item={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
