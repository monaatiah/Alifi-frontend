import React from "react";

const ProductsPage = () => {
  return <></>;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default ProductsPage;
