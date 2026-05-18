# Universal Slug-Based Page Architecture

## Overview

This is a complete restructure from hardcoded individual pages to a **dynamic, CMS-driven** page system. All pages are now managed through a single `[slug].js` route with configuration-driven component rendering.

## Architecture

### Key Components

#### 1. **Component Registry** (`src/helpers/componentRegistry.js`)
Maps component types to actual React components. Allows CMS to dynamically render without code changes.

```javascript
{
  "product": SingleProduct,
  "blog": SingleBlog,
  "blogs-page": BlogsPageSection,
  // ... etc
}
```

#### 2. **Page Configuration** (`src/helpers/pageConfig.js`)
Defines which components render on which page types and in what order.

```javascript
// Example: Product page renders
{
  components: [
    { slug: "header", order: 0 },
    { slug: "inner-head", order: 1 },
    { slug: "single-product", order: 2 },
    { slug: "reviews", order: 3 },
    { slug: "footer", order: 4 }
  ]
}
```

#### 3. **Page Renderer** (`src/components/layout/PageRenderer.jsx`)
Universal component that renders any page based on configuration. Maps data from Redux store to components.

#### 4. **Page API** (`src/api/pageContent.js`)
Unified data fetching layer. Determines content type and fetches appropriate data.

#### 5. **Page Store** (`src/store/page/`)
Redux state for page-level data and configuration.

#### 6. **Dynamic Route** (`pages/[slug].js`)
Single route that handles ALL dynamic pages using ISR (Incremental Static Regeneration).

---

## How to Use

### Adding a New Page Type

1. **Register the component in `componentRegistry.js`:**

```javascript
const MyNewComponent = dynamic(() => import("@/components/my-new-component"), {
  ssr: false,
});

export const COMPONENT_REGISTRY = {
  // ... existing components
  "my-component": { component: MyNewComponent, canHaveData: true },
};
```

2. **Add page layout in `pageConfig.js`:**

```javascript
export const PAGE_LAYOUTS = {
  // ... existing layouts
  "my-page-type": {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "my-component", order: 1, required: true },
      { slug: "footer", order: 2, required: true },
    ],
  },
};
```

3. **The page is now automatically available at `/my-page-slug`!**

### Adding CMS-Driven Content

When your CMS adds a page, it returns configuration like:

```json
{
  "slug": "custom-page",
  "type": "page",
  "title": "My Custom Page",
  "components": [
    {
      "slug": "header",
      "order": 0,
      "config": {}
    },
    {
      "slug": "custom-section",
      "order": 1,
      "config": {
        "title": "Custom Title",
        "items": [...]
      }
    },
    {
      "slug": "footer",
      "order": 2,
      "config": {}
    }
  ]
}
```

The `[slug].js` page automatically renders it!

### Accessing Page Data in Components

Components automatically receive data from Redux store:

```jsx
const MyComponent = ({ product, blog, category, data, config }) => {
  // All these are available if component is registered with canHaveData: true
  return <div>{product?.name}</div>;
};
```

---

## Data Flow

```
User visits /my-page-slug
        ↓
[slug].js getStaticProps runs
        ↓
getPageDataBySlugApi fetches content
        ↓
Determines page type (product/blog/page/etc)
        ↓
Gets layout config from PAGE_LAYOUTS
        ↓
Dispatches getPageConfig action
        ↓
Page store populated with layout
        ↓
PageRenderer component renders
        ↓
Iterates components in order
        ↓
For each component:
  - Gets component from registry
  - Wires data from store
  - Renders with props
        ↓
Complete rendered page
```

---

## Migration Guide

### Old Way (Before)
```javascript
// pages/products/[id].js
const SingleProductsPage = () => {
  const { singleProduct } = useSelector((state) => state.products);
  return (
    <>
      <Header />
      <InnerHead />
      <SingleProduct />
      <ReviewsSection data={singleProduct?.reviews} />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    const { id } = params;
    store.dispatch(getSingleProduct({ slug: id }));
    store.dispatch(getSettings({}));
    store.dispatch(getCategories({}));
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return { props: {}, revalidate: 1 };
  };
});
```

### New Way (After)
```javascript
// pages/[slug].js - ONE FILE FOR ALL PAGES
const DynamicSlugPage = () => {
  const pageState = useSelector((state) => state?.page);
  const { layout, meta, data, slug } = pageState;
  
  return (
    <PageRenderer
      pageConfig={layout}
      pageData={data}
      slug={slug}
      meta={meta}
    />
  );
};

// getStaticProps handles ALL content types automatically!
export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    const { slug } = params;
    const pageData = await getPageDataBySlugApi({ slug });
    const layout = getPageLayout(determinePageType(slug, pageData));
    store.dispatch(getPageConfig({ slug, layout, data: pageData }));
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return { props: {}, revalidate: 60 };
  };
});
```

### Files to Delete (After Migration)
- `pages/products/[id].js` - Use `/[slug].js` instead
- `pages/blogs/[id].js` - Use `/[slug].js` instead
- `pages/categories/[id].js` - Use `/[slug].js` instead
- `pages/services/[id].js` - Use `/[slug].js` instead
- Any other `pages/*/[id].js` files

---

## Adding Custom Component Logic

### If component needs special data handling:

```javascript
// In PageRenderer.jsx - add to dataMap
const dataMap = {
  "my-component": storeData?.customData,
  // or conditionally
  ...(componentSlug === "special") && {
    "special": storeData?.specialData,
  }
};
```

### If component needs custom API call:

```javascript
// In pageContent.js - add condition
export const getPageDataBySlugApi = async ({ slug, cookies = {} }) => {
  // ... existing code
  
  if (pageData.contentType === "custom") {
    const customData = await getCustomApi({ cookies, slug });
    pageData.custom = customData?.data;
  }
  
  return pageData;
};
```

---

## ISR Strategy

The `[slug].js` uses **Incremental Static Regeneration (ISR)**:
- Initial request with new slug: `fallback: "blocking"` → renders on-demand
- Subsequent requests: Uses cached version
- Every 60 seconds: Revalidates in background

Adjust `revalidate: 60` based on update frequency:
- News/blogs: 300-600 seconds (5-10 min)
- Products: 60-300 seconds (1-5 min)
- Static pages: 3600 seconds (1 hour)

---

## Error Handling

If a page fails to render:
1. Returns `notFound: true`
2. Caches 404 for specified time
3. Next request retries

Check build logs in `/logs/error.log` for details.

---

## Performance Tips

1. **Use dynamic imports** for heavy components
2. **Lazy load below-fold sections** with `ssr: false`
3. **Cache API responses** with ISR revalidation
4. **Pre-generate popular pages** in `getStaticPaths`
5. **Use image optimization** via Next.js Image component

---

## Debugging

Enable debug logging:

```javascript
// In [slug].js
console.log("Page State:", pageState);
console.log("Page Data:", data);
console.log("Layout:", layout);
```

Check Redux DevTools browser extension for state timeline.

---

## API Contract

Your CMS should return page data in this format:

```json
{
  "slug": "page-slug",
  "type": "product|blog|page|category|service",
  "title": "Page Title",
  "description": "SEO description",
  "meta": {
    "title": "Meta title",
    "description": "Meta description",
    "image": "image-url",
    "seo": {}
  },
  "components": [
    {
      "slug": "component-type",
      "order": 1,
      "required": true,
      "config": {}
    }
  ]
}
```

For content data (products, blogs, etc.):

```json
{
  "type": "product|blog|...",
  "slug": "unique-slug",
  "name": "Display name",
  "description": "Content description",
  "reviews": [],
  "relatedItems": []
}
```

---

## Summary

✅ **Single page handles all routes** - No more individual `[id].js` files  
✅ **CMS-driven rendering** - Add pages without code changes  
✅ **Reusable components** - Register once, use everywhere  
✅ **Type-safe routing** - Slug-based with automatic type detection  
✅ **ISR support** - Fast static pages with background updates  
✅ **Scalable** - Add new components/layouts easily  

Now your frontend is truly **headless** and **CMS-agnostic**! 🎉
