import React from "react";
import styles from "./styles/styles.module.scss";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import RelatedProducts from "./RelatedProducts";
import ProductAuthor from "./ProductAuthor";
import { useSelector } from "react-redux";

const Index = () => {
  const { singleProduct } = useSelector((state) => state.products);

  return (
    <div className={styles["single-product-section"]}>
      <ProductInfo singleProduct={singleProduct} />
      <ProductDescription singleProduct={singleProduct} />
      <ProductAuthor singleProduct={singleProduct} />
      {singleProduct?.related_products?.length > 0 && (
        <RelatedProducts singleProduct={singleProduct} />
      )}
    </div>
  );
};

export default Index;
