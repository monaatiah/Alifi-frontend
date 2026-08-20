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
  getSingleProduct,
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

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ProductPage = () => {
  const { asPath } = useRouter();
  const { singleProduct } = useSelector((state) => state.products);

  const seoTitle = singleProduct?.name || "";
  const seoDescription = singleProduct?.description || "";
  const seoImage = singleProduct?.image;

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
        title={seoTitle || "المنتج"}
        description={seoDescription}
        pageName={seoTitle || "المنتج"}
        imageSrc={seoImage}
      />
      <SingleProduct />
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
    try {
      const slug = params?.slug;
      if (!slug) {
        return { notFound: true, revalidate: 60 };
      }

      store.dispatch(
        getSingleProduct({
          cookies: {},
          slug,
        }),
      );

      store.dispatch(getSettings({ cookies: {} }));
      store.dispatch(getCategories({ cookies: {} }));
      store.dispatch(END);
      await store.sagaTask.toPromise();

      const singleProduct = store.getState()?.products?.singleProduct;

      if (!singleProduct?.id) {
        return { notFound: true, revalidate: 60 };
      }

      return {
        props: {},
        revalidate: 60,
      };
    } catch (error) {
      console.error("products/[slug].js error", params?.slug, error?.message);
      return { notFound: true, revalidate: 300 };
    }
  };
});

export default ProductPage;