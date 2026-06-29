import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { wrapper } from "../../../src/store";
import { END } from "redux-saga";
import { getContent, getContentCategories, getSettings } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Breadcrumb = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const BlogsPageSection = dynamic(
  () => import("@/components/blogs-page-section/Index"),
  {
    ssr: false,
  },
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const BlogCategoryPage = () => {
  const { asPath } = useRouter();

  return (
    <>
      <NextSeo
        title="مقالات"
        description="مقالات حسب التصنيف"
        canonical={
          typeof window !== "undefined"
            ? window.location.href
            : `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`
        }
      />
      <Header />
      <Breadcrumb title="المقالات" pageName="المقالات" />
      <BlogsPageSection categorySlug={asPath.split("/").filter(Boolean).slice(-1)[0]} />
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
    try {
      const slug = params?.slug;
      if (!slug) {
        return { notFound: true, revalidate: 60 };
      }

      store.dispatch(getSettings({ cookies: {} }));
      store.dispatch(getContentCategories({ cookies: {} }));
      store.dispatch(getContent({ cookies: {}, filters: [], limit: 20, page: 1 }));

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {},
        revalidate: 60,
      };
    } catch (error) {
      console.error("blogs/categories/[slug].js error", params?.slug, error?.message);
      return { notFound: true, revalidate: 300 };
    }
  };
});

export default BlogCategoryPage;