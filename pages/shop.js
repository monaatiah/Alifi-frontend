import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getPageData,
  getProducts,
  getSettings,
} from "@/store/actions";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const ShopCategories = dynamic(
  () => import("@/components/shop-categories/Index"),
  {
    ssr: false,
  },
);

const Shop = dynamic(() => import("@/components/shop/Index"), {
  ssr: false,
});

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  const { pageData } = useSelector((state) => state.settings);
  const shopHeroData = getComponentByIdentifier(
    pageData?.page_components,
    "shop_hero",
  );

  return (
    <>
      <Header />
      <BreadCrumbSection
        title={shopHeroData?.data?.title || ""}
        description={shopHeroData?.data?.description || ""}
        pageName="المتجر"
        imageSrc={shopHeroData?.data?.image || ""}
      />
      <ShopCategories />
      <Shop />
      <JoinUsSection />
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
        slug: "shop",
      }),
    );

    store.dispatch(
      getCategories({
        cookies: {},
      }),
    );

    store.dispatch(
      getProducts({
        cookies: {},
        filters: [{ field: "status", operator: "=", value: "published" }],
        sorts: [],
        limit: 20,
        page: 1,
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
