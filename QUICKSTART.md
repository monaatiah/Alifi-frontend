# Universal Slug Architecture - Quick Start Guide

## What You Get

A **single `[slug].js` file** that intelligently handles:
- ✅ Products (`/products/my-product`)
- ✅ Blogs (`/blogs/my-blog`)
- ✅ Categories (`/categories/my-category`)
- ✅ Services (`/services/my-service`)
- ✅ Any CMS page (`/my-custom-page`)
- ✅ 404 pages

**No more individual page files!** 🚀

---

## Quick Reference

### 1. Adding a New Component Type

**File:** `src/helpers/componentRegistry.js`

```javascript
import MyNewComponent from "@/components/my-new-component";

export const COMPONENT_REGISTRY = {
  // ... existing
  "my-component": { 
    component: MyNewComponent, 
    canHaveData: true  // if it accepts props like data={...}
  },
};
```

### 2. Defining How Pages Look

**File:** `src/helpers/pageConfig.js`

```javascript
export const PAGE_LAYOUTS = {
  "my-page-type": {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "my-component", order: 1, required: true },
      { slug: "footer", order: 2, required: true },
    ],
  },
};
```

### 3. Component Receives Props Automatically

Your component just needs to accept props:

```jsx
// src/components/my-component/Index.jsx
export default function MyComponent({ data, config, product, blog }) {
  return <div>{data?.title}</div>;
}
```

---

## Real-World Examples

### Example 1: Custom Blog Card Component

**Step 1:** Create component
```jsx
// src/components/blog-cards/Index.jsx
export default function BlogCards({ blogs, config }) {
  const maxCards = config?.maxCards || 6;
  return (
    <div className="blog-grid">
      {blogs?.slice(0, maxCards).map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
```

**Step 2:** Register it
```javascript
// src/helpers/componentRegistry.js
const BlogCards = dynamic(() => import("@/components/blog-cards"), { ssr: false });

export const COMPONENT_REGISTRY = {
  "blog-cards": { component: BlogCards, canHaveData: true },
};
```

**Step 3:** Add to layout
```javascript
// src/helpers/pageConfig.js
export const PAGE_LAYOUTS = {
  "homepage": {
    components: [
      { slug: "header", order: 0 },
      { slug: "hero", order: 1 },
      { slug: "blog-cards", order: 2 },  // ← NEW!
      { slug: "footer", order: 3 },
    ],
  },
};
```

**Step 4:** CMS can now use it!
```json
{
  "slug": "my-homepage",
  "components": [
    { "slug": "blog-cards", "order": 2, "config": { "maxCards": 12 } }
  ]
}
```

---

### Example 2: Products with Filters

**Step 1:** Create component
```jsx
// src/components/products-filtered/Index.jsx
export default function ProductsFiltered({ products, config }) {
  const filtered = filterByCategory(products, config?.category);
  return <ProductGrid products={filtered} />;
}
```

**Step 2:** Register it
```javascript
// src/helpers/componentRegistry.js
const ProductsFiltered = dynamic(() => import("@/components/products-filtered"));

export const COMPONENT_REGISTRY = {
  "products-filtered": { component: ProductsFiltered, canHaveData: true },
};
```

**Step 3:** Add layout
```javascript
export const PAGE_LAYOUTS = {
  "category": {
    components: [
      { slug: "header", order: 0 },
      { slug: "products-filtered", order: 1 },
      { slug: "footer", order: 2 },
    ],
  },
};
```

---

### Example 3: CMS Adding Custom Components

CMS dashboard adds a page like this:

```json
{
  "slug": "summer-sale",
  "type": "page",
  "title": "Summer Sale 2024",
  "components": [
    {
      "slug": "header",
      "order": 0
    },
    {
      "slug": "hero",
      "order": 1,
      "config": {
        "title": "SUMMER SALE",
        "image": "/sale-banner.jpg"
      }
    },
    {
      "slug": "products-filtered",
      "order": 2,
      "config": {
        "category": "summer",
        "maxItems": 20
      }
    },
    {
      "slug": "testimonials",
      "order": 3
    },
    {
      "slug": "footer",
      "order": 4
    }
  ]
}
```

**No frontend code changes needed!** The page is live at `/summer-sale` 🎉

---

## File Structure

```
src/
├── helpers/
│   ├── componentRegistry.js    ← Add components here
│   ├── pageConfig.js           ← Add layouts here
│   └── functions.js            ← Utilities
├── api/
│   ├── pageContent.js          ← Data fetching
│   └── [other APIs]
├── components/
│   ├── layout/
│   │   └── PageRenderer.jsx    ← Universal renderer
│   ├── header/
│   ├── blog-cards/
│   └── [other components]
└── store/
    ├── page/                   ← Page state
    │   ├── actions.js
    │   ├── reducer.js
    │   └── saga.js
    └── [other stores]

pages/
└── [slug].js                   ← ONE FILE FOR ALL!
```

---

## Key Concepts

### Component Registry
Maps string IDs to React components. Allows CMS to say "render `blog-cards`" without knowing the actual import.

### Page Configuration
Tells the system which components to render in which order. Can be static (in code) or dynamic (from CMS).

### PageRenderer
Takes a config and renders all components, wiring data automatically.

### ISR (Incremental Static Regeneration)
Generates pages on-demand but caches them. On next visit, serves cached version. Refreshes in background every 60 seconds.

---

## Common Operations

### Update component appearance
```javascript
// src/components/my-component/Index.jsx
// Just update the component - no page config changes needed!
```

### Add new page type
```javascript
// Add layout to pageConfig.js
// Done! Pages of that type render automatically
```

### Change component order on page
```javascript
// Update componentRegistry priority or pageConfig order
// All pages using that layout update instantly
```

### CMS wants specific layout
```javascript
// CMS returns custom component order
// PageRenderer renders exactly what it specifies
```

---

## Troubleshooting

### Component not showing?
1. Check if registered in `componentRegistry.js`
2. Check if included in page layout in `pageConfig.js`
3. Check browser console for errors

### Data not arriving?
1. Check if component set `canHaveData: true`
2. Check if store has the data (Redux DevTools)
3. Check API response in Network tab

### Page not found?
1. Check if slug exists in CMS
2. Check `getStaticProps` error logs
3. Try rebuilding: `npm run build`

---

## Next Steps

1. **Register your first custom component** in `componentRegistry.js`
2. **Add it to a layout** in `pageConfig.js`
3. **Test the page** at the slugified URL
4. **Tell your CMS** that the component is available
5. **Let CMS create pages** using it!

---

## Support

For detailed documentation, see `ARCHITECTURE.md`

For API contract, check `src/api/pageContent.js` comments.

For component props, check `src/components/layout/PageRenderer.jsx`
