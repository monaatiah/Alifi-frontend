import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import NotFoundImg from "./assets/404.svg";

const Index = () => {
  return (
    <div className={styles["notfound-section"]}>
      <Container>
        <div className="content d-flex align-items-center justify-content-center flex-column gap-5">
          <NotFoundImg />
          <h2>عذراً، الصفحة التي تبحث عنها غير موجودة!</h2>
        </div>
      </Container>
    </div>
  );
};

export default Index;
