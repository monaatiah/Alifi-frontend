/**
 * EXAMPLE: How to Migrate Existing Pages to New System
 * 
 * This file shows the transformation from old hardcoded pages
 * to the new dynamic slug-based system
 */

// ============================================================================
// BEFORE: pages/products/[id].js (Old Way - Multiple Page Files)
// ============================================================================

/*
import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getSettings, getSingleProduct } from "@/store/actions";

const Header = dynamic(() => import("@/components/header/Index"), { ssr: false });
const InnerHead = dynamic(() => import("@/components/inner-head/Index"), { ssr: false });
import SingleProduct from "@/components/single-product/Index";
import { useSelector } from "react-redux";

const ReviewsSection = dynamic(
  () => import("@/components/reviews-section/Index"),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/footer/Index"), { ssr: false });

// ❌ Problem 1: Hardcoded component rendering
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

// ❌ Problem 2: Manual component loading/styling
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

// ❌ Problem 3: Separate getStaticProps for each page type
export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    const { id } = params;

    // Manual data dispatch
    store.dispatch(getSingleProduct({ slug: id }));
    store.dispatch(getSettings({}));
    store.dispatch(getCategories({}));

    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
*/

// ============================================================================
// AFTER: pages/[slug].js (New Way - Single Universal Page)
// ============================================================================

import React from "react";
import { wrapper } from "@/store";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import PageRenderer from "@/components/layout/PageRenderer";
import {
  getPageLayout,
  determinePageType,
} from "@/helpers/pageConfig";
import { getPageDataBySlugApi } from "@/api/pageContent";
import { getSettings, getCategories, getPageConfig } from "@/store/actions";

// ✅ Solution 1: Single component that works for ALL pages
const DynamicSlugPage = () => {
  const pageState = useSelector((state) => state?.page);
  const { layout, meta, data, slug } = pageState;

  // If layout not loaded, show loading
  if (!layout) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  // ✅ Universal renderer handles ALL page types
  return (
    <PageRenderer
      pageConfig={layout}
      pageData={data}
      slug={slug}
      meta={meta}
      seo={data?.seo}
    />
  );
};

// ✅ Solution 2: Single getStaticPaths for all content types
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // ISR handles everything
  };
}

// ✅ Solution 3: One getStaticProps for all content types!
export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    try {
      const { slug } = params;

      if (!slug) {
        return { notFound: true, revalidate: 60 };
      }

      // Basic setup - same for all pages
      store.dispatch(getSettings({}));
      store.dispatch(getCategories({}));

      // ✅ Magic: Unified API call handles products, blogs, categories, etc.
      const pageData = await getPageDataBySlugApi({ slug, cookies: {} });

      if (!pageData) {
        return { notFound: true, revalidate: 3600 };
      }

      // ✅ Automatic page type detection
      const pageType = determinePageType(slug, pageData);

      // ✅ Get layout for this page type
      const layout = getPageLayout(pageType, pageData?.config?.components || []);

      // ✅ Single dispatch with complete data
      store.dispatch(
        getPageConfig({
          slug,
          config: pageData?.config,
          layout,
          meta: pageData?.meta || {},
        })
      );

      store.dispatch(END);
      await store.sagaTask.toPromise();

      return {
        props: { slug, pageData },
        revalidate: 60, // ISR
      };
    } catch (error) {
      console.error("Error:", error);
      return { notFound: true, revalidate: 300 };
    }
  };
});

export default DynamicSlugPage;

// ============================================================================
// WHAT THIS MEANS FOR YOUR PROJECT
// ============================================================================

/*
CHANGES NEEDED:

1. DELETE these old page files:
   - pages/products/[id].js
   - pages/blogs/[id].js
   - pages/categories/[id].js
   - pages/services/[id].js
   - pages/services/categories/[id].js
   - Any other pages/*/[id].js

2. CREATE one new file:
   - pages/[slug].js (place the new one above)

3. IN src/helpers/componentRegistry.js:
   - Add all components that need to be dynamically renderable
   
4. IN src/helpers/pageConfig.js:
   - Define layouts for each page type

5. IN your CMS:
   - Update page definitions to include component configurations

THAT'S IT! Your site now has:
- ✅ Only ONE dynamic page file to maintain
- ✅ CMS can add pages without code changes
- ✅ CMS can reorder components without code changes
- ✅ CMS can add new component types (after registering in code)
- ✅ All pages get ISR caching automatically
- ✅ Cleaner, more maintainable project structure

BEFORE vs AFTER:
- Hardcoded components everywhere → Component-driven architecture
- Multiple page files → Single dynamic page
- Can't change layouts without code → CMS controls layouts
- Slow to add features → Add feature to registry → Done!
*/

// ============================================================================
// REAL EXAMPLE: How to Add a New Component
// ============================================================================

/*
Step 1: Create the component (no changes needed from your current components)
┌─────────────────────────────────────────────────────────────┐
│ src/components/featured-products/Index.jsx                  │
├─────────────────────────────────────────────────────────────┤
│ export default function FeaturedProducts({ products }) {    │
│   return <div>{products?.map(...)}</div>;                   │
│ }                                                             │
└─────────────────────────────────────────────────────────────┘

Step 2: Register in componentRegistry.js
┌─────────────────────────────────────────────────────────────┐
│ import FeaturedProducts from "@/components/featured-products"│
│                                                              │
│ export const COMPONENT_REGISTRY = {                          │
│   ...existing,                                              │
│   "featured-products": {                                    │
│     component: FeaturedProducts,                            │
│     canHaveData: true                                       │
│   }                                                          │
│ }                                                             │
└─────────────────────────────────────────────────────────────┘

Step 3: Add to pageConfig layouts where you want it
┌─────────────────────────────────────────────────────────────┐
│ export const PAGE_LAYOUTS = {                                │
│   "home": {                                                  │
│     components: [                                            │
│       { slug: "header", order: 0 },                          │
│       { slug: "hero", order: 1 },                            │
│       { slug: "featured-products", order: 2 }, // ← NEW   │
│       { slug: "blogs", order: 3 },                           │
│       { slug: "footer", order: 4 }                           │
│     ]                                                        │
│   }                                                          │
│ }                                                             │
└─────────────────────────────────────────────────────────────┘

Step 4: CMS can now use it!
Your CMS dashboard displays "Featured Products" as an available
component. When CMS adds it to a page, it renders automatically.

NO page files created. NO import statements added elsewhere.
Just 3 files updated and you've unlocked a new feature!
*/
