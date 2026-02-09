import React from "react";
import { wrapper } from "../../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getPageData, getSettings } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

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

const SingleProductsPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="مدونة مفردة"
        pageName="مدونة مفردة"
        sector={{ name: "blogs", link: "/blogs" }}
      />
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

export default SingleProductsPage;
