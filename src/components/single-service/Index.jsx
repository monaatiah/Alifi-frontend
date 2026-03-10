import React from "react";
import styles from "./styles/styles.module.scss";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import { useSelector } from "react-redux";
import Extras from "./Extras";

const Index = () => {
  const { singleProduct } = useSelector((state) => state.products);

  return (
    <div className={styles["single-product-section"]}>
      <ProductInfo singleProduct={singleProduct} />
      <ProductDescription singleProduct={singleProduct} />
      <Extras />
    </div>
  );
};

export default Index;
