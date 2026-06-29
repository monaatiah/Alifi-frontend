import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import {
  getCategories,
  getSettings,
  getSingleCategory,
} from "@/store/actions";
import { handleImageLink } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Breadcrumb = dynamic(
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

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const CategoryPage = () => {
  const { asPath } = useRouter();
  const { singleCategory } = useSelector((state) => state.categories);

  const seoTitle = singleCategory?.name || "";
  const seoDescription = singleCategory?.description || "";
  const seoImage = singleCategory?.image || singleCategory?.icon;

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
                width: 800,
                height: 600,
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
        title={seoTitle || "المنتجات"}
        description={seoDescription}
        pageName={seoTitle || "المنتجات"}
        imageSrc={seoImage}
      />
      <SingleCategory />
      <Footer />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ params }) => {
    try {
      const slug = params?.slug;
      if (!slug) {
        return { notFound: true };
      }

      store.dispatch(
        getSingleCategory({
          cookies: {},
          slug,
        }),
      );

      store.dispatch(getSettings({ cookies: {} }));
      store.dispatch(getCategories({ cookies: {} }));
      store.dispatch(END);
      await store.sagaTask.toPromise();

      const singleCategory = store.getState()?.categories?.singleCategory;

      if (!singleCategory?.id) {
        return { notFound: true };
      }

      return {
        props: {},
      };
    } catch (error) {
      console.error("categories/[slug].js error", params?.slug, error?.message);
      return { notFound: true };
    }
  };
});

export default CategoryPage;
