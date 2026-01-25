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

const ShopServices = dynamic(() => import("@/components/shop-services/Index"), {
  ssr: false,
});

const Shop = dynamic(() => import("@/components/shop/Index"), {
  ssr: false,
});

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const ShopPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection title="خدماتنا" pageName="خدماتنا" />
      <ShopServices />
      <Shop />
      <JoinUsSection />
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
