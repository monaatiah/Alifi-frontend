import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getCategoryProducts,
  getSettings,
  getSingleCategory,
} from "@/store/actions";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const SingleCategory = dynamic(
  () => import("@/components/single-category/Index"),
  {
    ssr: false,
  },
);

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  const { singleCategory } = useSelector((state) => state.categories);

  return (
    <>
      <Header />
      <BreadCrumbSection
        title={singleCategory?.name || ""}
        description={singleCategory?.description || ""}
        pageName={singleCategory?.name || ""}
        imageSrc={handleImageLink(singleCategory?.image) || ""}
      />

      <SingleCategory />
      <JoinUsSection />
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    const { id } = params;
    store.dispatch(
      getSettings({
        cookies: {},
      }),
    );

    store.dispatch(
      getSingleCategory({
        cookies: {},
        slug: id,
      }),
    );

    store.dispatch(
      getCategories({
        cookies: {},
      }),
    );

    store.dispatch(
      getCategoryProducts({
        cookies: {},
        slug: id,
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
