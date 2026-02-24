import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getPageData, getSettings } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const CartSection = dynamic(() => import("@/components/cart/Index"), {
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
        title="سلة التسوق"
        pageName="سلة التسوق"
        paymentPages
      />
      <CartSection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(
      getSettings({
        cookies: {},
      }),
    );
    store.dispatch(
      getPageData({
        cookies: {},
        slug: "cart",
      }),
    );

    store.dispatch(
      getCategories({
        cookies: {},
      }),
    );

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
