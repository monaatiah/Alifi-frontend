/**
 * Dynamic slug router - handles any CMS-managed page
 * Fetches page data from /pages/actions/get-by-slug and renders
 * the components defined in page_components, in ordering order.
 */

import React from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import PageRenderer from "../src/components/layout/PageRenderer";
import { getPageConfigBySlugApi } from "../src/api/pageContent";
import { handleImageLink } from "../src/helpers/functions";
import { getSettings, getCategories, getPageData } from "../src/store/actions";

/**
 * Recursively strip non-serializable values (undefined, functions, Dates)
 */
const sanitize = (val) => {
  if (val === undefined || val === null) return null;
  if (val instanceof Date) return val.toISOString();
  if (typeof val === "function") return null;
  if (Array.isArray(val)) return val.map(sanitize).filter((v) => v !== null);
  if (typeof val === "object") {
    return Object.fromEntries(
      Object.entries(val)
        .map(([k, v]) => [k, sanitize(v)])
        .filter(([, v]) => v !== null && v !== undefined)
    );
  }
  return val;
};

const DynamicSlugPage = ({ pageComponents, meta, seo, slug }) => {
  const { locale = "ar", asPath } = useRouter();
  const pageData = useSelector((state) => state?.settings?.pageData || {});

  // Prefer SEO/meta from store pageData, then fallback to static props
  const pageMeta = pageData?.meta || meta || {};
  const pageSeo = pageData?.seo || seo || {};

  const seoTitle = pageMeta?.title || pageSeo?.title?.[locale] || "";
  const seoDescription = pageMeta?.description || pageSeo?.description?.[locale] || "";
  const seoImage = pageMeta?.image || pageSeo?.image?.[locale];

  if (!pageComponents) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Page Not Available</h1>
      </div>
    );
  }

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
          title: seoTitle,
          description: seoDescription,
          ...(seoImage && { image: handleImageLink(seoImage) }),
        }}
      />

      <PageRenderer
        pageComponents={pageComponents}
        meta={meta || {}}
        seo={seo || {}}
        slug={slug || ""}
      />
    </>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    try {
      const { slug } = params || {};
      if (!slug) return { notFound: true, revalidate: 60 };

      // Fetch page config from CMS
      const cmsData = await getPageConfigBySlugApi({ cookies: {}, slug });

      // If CMS has no record for this slug, return 404
      if (!cmsData || !cmsData.id) {
        return { notFound: true, revalidate: 60 };
      }

      // Dispatch global data (settings, categories) for header/footer
      // Dispatch getPageData so components can self-service via getComponentByIdentifier
      store.dispatch(getSettings({ cookies: {} }));
      store.dispatch(getCategories({ cookies: {} }));
      store.dispatch(getPageData({ cookies: {}, slug }));
      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: sanitize({
          slug,
          pageComponents: cmsData.page_components || [],
          meta: cmsData.meta || {},
          seo: cmsData.seo || {},
        }),
        revalidate: 60,
      };
    } catch (error) {
      console.error("[slug].js error for", params?.slug, error?.message);
      return { notFound: true, revalidate: 300 };
    }
  };
});

export default DynamicSlugPage;

