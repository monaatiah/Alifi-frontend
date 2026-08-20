import React from "react";
import styles from "./styles/styles.module.scss";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import { useSelector } from "react-redux";

const Index = () => {
  const { singleService } = useSelector((state) => state.services);

  return (
    <div className={styles["single-product-section"]}>
      <ProductInfo singleService={singleService} />
      <ProductDescription singleService={singleService} />
    </div>
  );
};

export default Index;
