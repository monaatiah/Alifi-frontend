import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const OrderStatus = dynamic(() => import("@/components/order-status/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="تأكيد الطلب"
        pageName="تأكيد الطلب"
        paymentPages
      />
      <OrderStatus />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
