import React from "react";
import styles from "./styles/styles.module.scss";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";
import ProductAuthor from "./ProductAuthor";

const Index = () => {
  return (
    <div className={styles["single-product-section"]}>
      <ProductInfo />
      <ProductDescription />
      <ProductAuthor />
      <RelatedProducts />
    </div>
  );
};

export default Index;
