import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});

const SingleProduct = dynamic(
  () => import("@/components/single-product/Index"),
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

const SingleProductsPage = () => {
  return (
    <>
      <Header />
      <InnerHead />
      <SingleProduct />
      <ReviewsSection />
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
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
