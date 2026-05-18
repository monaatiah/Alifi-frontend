import React from "react";
import { wrapper } from "../../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import {
  getCategories,
  getPageData,
  getSettings,
  getSingleServiceProvider,
} from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const SingleProvider = dynamic(
  () => import("@/components/single-provider/Index"),
  {
    ssr: false,
  },
);

const ReviewsSection = dynamic(
  () => import("@/components/reviews-section/Index"),
  {
    ssr: false,
  },
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  const { singleProvider } = useSelector((state) => state.services);
  const providerName =
    singleProvider?.provider?.name || singleProvider?.name || "صفحة البائع";

  return (
    <>
      <Header />
      <BreadCrumbSection title={providerName} pageName={providerName} />
      <SingleProvider />
      <ReviewsSection />
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
      getSingleServiceProvider({
        cookies: {},
        service_provider_slug: id,
        page: 1,
        per_page: 20,
      }),
    );

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

export default ShopPage;
