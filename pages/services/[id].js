import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getPageData, getSettings, getSingleProduct } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});

const SingleService = dynamic(
  () => import("@/components/single-service/Index"),
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

const Providers = dynamic(
  () => import("@/components/services-providers/Index"),
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

const SingleServicePage = () => {
  return (
    <>
      <Header />
      <InnerHead />
      <SingleService />
      <ReviewsSection />
      <Providers />
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
      getSingleProduct({
        slug: id,
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

    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleServicePage;
