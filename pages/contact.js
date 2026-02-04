import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getPageData, getSettings } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const Contact = dynamic(() => import("@/components/contact/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection title="تواصل معنا" pageName="تواصل معنا" />
      <Contact />
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
        slug: "home",
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

export default ShopPage;
