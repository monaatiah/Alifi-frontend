import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getPageData, getSettings } from "@/store/actions";
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

const ShopCategories = dynamic(() => import("@/components/categories/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  const { pageData } = useSelector((state) => state.settings);
  const categoriesHeroData = getComponentByIdentifier(
    pageData?.page_components,
    "categories_hero",
  );

  return (
    <>
      <Header />
      <BreadCrumbSection
        title={categoriesHeroData?.data?.title || ""}
        description={categoriesHeroData?.data?.description || ""}
        pageName={categoriesHeroData?.data?.title || ""}
        imageSrc={categoriesHeroData?.data?.image || ""}
      />
      <ShopCategories />
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
        slug: "categories",
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

export default ShopPage;
