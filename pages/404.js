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
  }
);

const NotFound = dynamic(() => import("@/components/not-found/Index"), {
  ssr: false,
});

const ShopPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="404 - الصفحة غير موجودة"
        pageName="الصفحة غير موجودة"
      />
      <NotFound />
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

export default ShopPage;
