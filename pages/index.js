import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getCategories, getPageData, getSettings } from "@/store/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";
import PageRenderer from "@/components/layout/PageRenderer";
import { getPageConfigBySlugApi } from "../src/api/pageContent";

const Home = ({ pageComponents = [] }) => {
  const { locale, asPath } = useRouter();
  const { pageData } = useSelector((state) => state.settings);

  const seoTitle = pageData?.meta?.title || pageData?.title || "";
  const seoDescription = pageData?.meta?.description || "";
  const seoImage = pageData?.seo?.image?.[locale];

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          ...(seoImage && {
            images: [{
              url: handleImageLink(seoImage),
              width: 800,
              height: 600,
              alt: seoTitle,
            }],
          }),
        }}
        canonical={
          typeof window !== "undefined"
            ? window.location.href
            : `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`
        }
        twitter={{
          cardType: "summary_large_image",
          title: pageData?.seo?.title?.[locale] || seoTitle,
          description: pageData?.seo?.description?.[locale] || seoDescription,
          ...(seoImage && { image: handleImageLink(seoImage) }),
        }}
      />
      <PageRenderer
        pageComponents={pageComponents}
        meta={pageData?.meta || {}}
        seo={pageData?.seo || {}}
        slug="home"
      />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    // Fetch component list directly so it arrives as static props (not Redux-dependent)
    const cmsData = await getPageConfigBySlugApi({ cookies: {}, slug: "home" });

    store.dispatch(getSettings({ cookies: {} }));
    store.dispatch(getPageData({ cookies: {}, slug: "home" }));
    store.dispatch(getCategories({ cookies: {} }));
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {
        pageComponents: cmsData?.page_components || [],
      },
      revalidate: 60,
    };
  };
});

export default Home;
