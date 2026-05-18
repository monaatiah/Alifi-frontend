/**
 * Page Configuration System
 * Maps page types/slugs to their component configurations
 * This is fetched from CMS but has defaults for each content type
 */

/**
 * Default page layout configurations
 * CMS can override/extend these per page
 */
export const PAGE_LAYOUTS = {
  // Homepage layout
  home: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "hero", order: 1, required: false },
      { slug: "about", order: 2, required: false },
      { slug: "shop", order: 3, required: false },
      { slug: "products", order: 4, required: false },
      { slug: "services", order: 5, required: false },
      { slug: "why", order: 6, required: false },
      { slug: "join-us", order: 7, required: false },
      { slug: "reviews", order: 8, required: false },
      { slug: "blogs", order: 9, required: false },
      { slug: "footer", order: 10, required: true },
    ],
  },

  // Single product page
  product: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "single-product", order: 2, required: true },
      { slug: "reviews", order: 3, required: false },
      { slug: "related-products", order: 4, required: false },
      { slug: "footer", order: 5, required: true },
    ],
  },

  // Product category/shop page
  category: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "breadcrumb", order: 2, required: false },
      { slug: "single-category", order: 3, required: true },
      { slug: "footer", order: 4, required: true },
    ],
  },

  // Single blog page
  blog: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "single-blog", order: 2, required: true },
      { slug: "blogs", order: 3, required: false },
      { slug: "related-products", order: 4, required: false },
      { slug: "footer", order: 5, required: true },
    ],
  },

  // Blog list/category page
  "blog-category": {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "blogs-page", order: 2, required: true },
      { slug: "footer", order: 3, required: true },
    ],
  },

  // All blogs page
  blogs: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "blogs-page", order: 2, required: true },
      { slug: "footer", order: 3, required: true },
    ],
  },

  // Services page
  services: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "services-page", order: 2, required: true },
      { slug: "footer", order: 3, required: true },
    ],
  },

  // Single service page
  service: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "single-service", order: 2, required: true },
      { slug: "footer", order: 3, required: true },
    ],
  },

  // Contact page
  contact: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "contact", order: 2, required: true },
      { slug: "work-hours", order: 3, required: false },
      { slug: "footer", order: 4, required: true },
    ],
  },

  // Generic content page (CMS pages)
  page: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "inner-head", order: 1, required: false },
      { slug: "footer", order: 2, required: true },
    ],
  },

  // 404 page
  404: {
    components: [
      { slug: "header", order: 0, required: true },
      { slug: "not-found", order: 1, required: true },
      { slug: "footer", order: 2, required: true },
    ],
  },
};

/**
 * Map content type from API to page type
 * Determines which layout to use for a given content
 */
export const CONTENT_TYPE_TO_PAGE_TYPE = {
  product: "product",
  products: "product",
  category: "category",
  categories: "category",
  blog: "blog",
  blogs: "blogs",
  "blog-category": "blog-category",
  content: "page",
  page: "page",
  service: "service",
  services: "services",
  contact: "contact",
};

/**
 * Get page layout configuration based on page/content type
 * @param {string} pageType - The page type (product, blog, category, etc.)
 * @param {Object} overrides - Additional component configs from CMS
 * @returns {Object} - Complete page configuration
 */
export const getPageLayout = (pageType, overrides = []) => {
  const baseLayout = PAGE_LAYOUTS[pageType] || PAGE_LAYOUTS.page;

  // If CMS provides specific component overrides
  if (Array.isArray(overrides) && overrides.length > 0) {
    const customComponents = [
      ...baseLayout.components,
      ...overrides,
    ].sort((a, b) => a.order - b.order);

    return {
      ...baseLayout,
      components: customComponents,
    };
  }

  return baseLayout;
};

/**
 * Determine page type from slug and content
 * @param {string} slug - The page slug
 * @param {Object} content - The content data from API
 * @returns {string} - The page type (used to get layout)
 */
export const determinePageType = (slug, content) => {
  // If content has a type field, use it
  if (content?.type) {
    return CONTENT_TYPE_TO_PAGE_TYPE[content.type] || "page";
  }

  // Try to infer from slug patterns
  if (slug === "home" || slug === "") return "home";
  if (slug?.startsWith("product-")) return "product";
  if (slug?.startsWith("blog-")) return "blog";
  if (slug?.startsWith("category-")) return "category";
  if (slug?.startsWith("service-")) return "service";
  if (slug === "contact") return "contact";

  // Default to generic page
  return "page";
};

/**
 * Build component render queue from configuration
 * Ensures required components are present with fallbacks
 * @param {Object} layoutConfig - The page layout config
 * @param {Object} pageData - The fetched page data
 * @returns {Array} - Ordered array of component configs ready to render
 */
export const buildRenderQueue = (layoutConfig, pageData = {}) => {
  if (!layoutConfig || !layoutConfig.components) {
    return [];
  }

  return layoutConfig.components
    .map((componentConfig) => ({
      ...componentConfig,
      // Pass relevant data if component can use it
      data: pageData[componentConfig.slug] || null,
    }))
    .sort((a, b) => a.order - b.order);
};

/**
 * Validate page configuration
 * @param {Object} config - Page config to validate
 * @returns {boolean} - Whether config is valid
 */
export const isValidPageConfig = (config) => {
  if (!config || typeof config !== "object") return false;
  if (!Array.isArray(config.components)) return false;
  return config.components.every(
    (comp) => comp.slug && typeof comp.order === "number"
  );
};
