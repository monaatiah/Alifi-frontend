import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getContentBySlug,
  getContentCategories,
  getFormSchema,
  getSettings,
} from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const SingleBlog = dynamic(() => import("@/components/single-blog/Index"), {
  ssr: false,
});

const BlogsSection = dynamic(() => import("@/components/blogs-section/Index"), {
  ssr: false,
});

const ReslatedProducts = dynamic(
  () => import("@/components/related-products/Index"),
  {
    ssr: false,
  },
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});
const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  return (
    <>
      <Header />

      <InnerHead />
      <SingleBlog />
      <BlogsSection
        noHeading
        title="مقالات جديدة"
        subTitle="المدونة والأخبار"
      />
      <ReslatedProducts />
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
      getContentBySlug({
        cookies: {},
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

    store.dispatch(
      getFormSchema({
        cookies: {},
        slug: "newsletter",
      }),
    );

    store.dispatch(
      getContentCategories({
        cookies: {},
        filters: [{ field: "content_type_id", operator: "=", value: 2 }],

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

export default SingleProductsPage;
