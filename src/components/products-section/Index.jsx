import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

const Index = () => {
  const data = [];

  return (
    <div className={styles["products-section"]}>
      <Container>
        <div className="sec-head">
          <h3>المنتجات</h3>
          <p>
            نقدّم لك مجموعة من المنتجات الموصى بها من خبراء الحيوانات الأليفة
            والمحبّين مثلِك. منتجات عالية الجودة مختارة لتناسب احتياجات حيوانك
            اليومية
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Index;
