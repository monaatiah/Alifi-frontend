import React from "react";
import dynamic from "next/dynamic";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import { getCategories, getPageData, getSettings } from "@/store/actions";
import { useRouteProtection } from "@/helpers/useRouteProtection";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});

const Wishlist = dynamic(() => import("@/components/profile/Wishlist"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const WishlistPage = () => {
  useRouteProtection("protected");

  return (
    <>
      <Header />
      <InnerHead />
      <Wishlist />
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

export default WishlistPage;
