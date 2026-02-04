import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getPageData, getSettings } from "@/store/actions";
import { useRouteProtection } from "@/helpers/useRouteProtection";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const ResetPassword = dynamic(
  () => import("@/components/reset-password/Index"),
  {
    ssr: false,
  },
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  useRouteProtection("auth-only");
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="استعادة كلمة المرور"
        pageName="استعادة كلمة المرور"
      />
      <ResetPassword />
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
