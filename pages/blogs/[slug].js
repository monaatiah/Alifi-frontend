import React from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import Header from "@/components/header/Index";
import Breadcrumb from "@/components/breadcrumb-section/Index";
import SingleBlog from "@/components/single-blog/Index";
import Footer from "@/components/footer/Index";
import { handleImageLink } from "@/helpers/functions";
import { getContentBySlugApi } from "@/api/content";
import {
  getSettings,
  getCategories,
  getContentBySlug,
  getContentCategories,
} from "@/store/actions";

const SingleBlogPage = ({ blog }) => {
  const { asPath } = useRouter();

  const seoTitle = blog?.title || "";
  const seoDescription =
    blog?.meta_description ||
    blog?.description ||
    (typeof blog?.body === "string" ? blog.body.replace(/<[^>]*>/g, "").slice(0, 160) : "");
  const seoImage = blog?.cover_image;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          ...(seoImage && {
            images: [
              {
                url: handleImageLink(seoImage),
                width: 1200,
                height: 630,
                alt: seoTitle,
              },
            ],
          }),
        }}
        canonical={
          typeof window !== "undefined"
            ? window.location.href
            : `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`
        }
        twitter={{
          cardType: "summary_large_image",
          title: seoTitle,
          description: seoDescription,
          ...(seoImage && { image: handleImageLink(seoImage) }),
        }}
      />

      <Header />
      <Breadcrumb
        title={seoTitle}
        description={blog?.meta_description || ""}
        pageName={seoTitle}
      />
      <SingleBlog />
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    try {
      const slug = params?.slug;
      if (!slug) {
        return { notFound: true, revalidate: 60 };
      }

      const response = await getContentBySlugApi({ cookies: {}, slug });
      const blog = response?.data?.data || null;

      if (!blog?.id) {
        return { notFound: true, revalidate: 60 };
      }

      store.dispatch(getSettings({ cookies: {} }));
      store.dispatch(getCategories({ cookies: {} }));
      store.dispatch(getContentBySlug({ cookies: {}, slug }));
      store.dispatch(getContentCategories({ cookies: {} }));
      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: {
          blog,
        },
        revalidate: 60,
      };
    } catch (error) {
      console.error("blogs/[slug].js error", error?.message || error);
      return { notFound: true, revalidate: 300 };
    }
  };
});

export default SingleBlogPage;
