import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getSettings, getSingleProduct } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});

import SingleProduct from "@/components/single-product/Index";
import { useSelector } from "react-redux";

const ReviewsSection = dynamic(
  () => import("@/components/reviews-section/Index"),
  {
    ssr: false,
  },
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  const { singleProduct } = useSelector((state) => state.products);

  return (
    <>
      <Header />
      <InnerHead />
      <SingleProduct />
      {singleProduct?.reviews?.length > 0 && (
        <ReviewsSection data={singleProduct?.reviews} />
      )}

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

export default SingleProductsPage;
