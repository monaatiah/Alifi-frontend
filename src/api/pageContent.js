/**
 * Page Content API
 * Unified data fetching for any page by slug
 * Handles fetching page config and all necessary data
 */

import server from "./server";
import { getSingleProductApi } from "./products";
import { getContentBySlugApi } from "./content";
import {
  getSingleCategoryApi,
  getCategoryProductsApi,
} from "./categories";

/**
 * Get page configuration by slug
 * CMS endpoint that returns which components to render and their config
 */
export const getPageConfigBySlugApi = async ({ cookies, slug }) => {
  try {
    const response = await server({ cookies }).post(
      `/pages/actions/get-by-slug`,
      {
        slug: slug,
      }
    );
    // CMS returns { data: { id, slug, meta, seo, page_components, ... } }
    return response.data?.data || null;
  } catch (error) {
    console.error(`Failed to fetch page config for slug: ${slug}`, error);
    return null;
  }
};

/**
 * Unified page data fetcher
 * Determines what type of content this is and fetches appropriate data
 * @param {string} slug - The page slug
 * @param {Object} cookies - Browser cookies
 * @returns {Object} - All data needed for the page
 */
export const getPageDataBySlugApi = async ({ slug, cookies = {} }) => {
  const pageData = {
    slug,
  };

  try {
    // First, try to get page config from CMS
    // This tells us what components to render
    const pageConfig = await getPageConfigBySlugApi({ cookies, slug });

    if (!pageConfig) {
      // Fallback: Try to detect page type based on slug and fetch accordingly
      const detectedType = detectPageType(slug);
      pageData.detectedType = detectedType;
      pageData.contentType = detectedType; // Set contentType so we don't get 404
      return pageData;
    }

    pageData.config = pageConfig;
    // Only set contentType if it exists, never undefined
    if (pageConfig.type || pageConfig.content_type) {
      pageData.contentType = pageConfig.type || pageConfig.content_type;
    }

    // Now fetch data for each component that needs it
    // Route to appropriate API based on page type

    if (pageData.contentType === "product" || slug.includes("product")) {
      const productData = await getSingleProductApi({ cookies, slug });
      pageData.product = productData?.data;
      pageData.singleProduct = productData?.data;
    }

    if (pageData.contentType === "blog" || slug.includes("blog")) {
      const blogData = await getContentBySlugApi({ cookies, slug });
      pageData.blog = blogData?.data;
      pageData.singleBlog = blogData?.data;
    }

    if (pageData.contentType === "category" || slug.includes("category")) {
      const categoryData = await getSingleCategoryApi({ cookies, slug });
      pageData.category = categoryData?.data;
      pageData.singleCategory = categoryData?.data;

      // Also fetch products in this category
      if (categoryData?.data?._id) {
        const categoryProducts = await getCategoryProductsApi({
          cookies,
          slug,
        });
        pageData.categoryProducts = categoryProducts?.data;
      }
    }

    return pageData;
  } catch (error) {
    console.error(`Error fetching page data for slug: ${slug}`, error);
    return pageData;
  }
};

/**
 * Detect page type from slug pattern
 * Used as fallback when CMS config is unavailable
 */
const detectPageType = (slug) => {
  if (slug === "home" || slug === "") return "home";
  if (slug.includes("product")) return "product";
  if (slug.includes("blog")) return "blog";
  if (slug.includes("category")) return "category";
  if (slug.includes("service")) return "service";
  if (slug.includes("contact")) return "contact";
  return "page";
};

/**
 * Fetch multiple pages worth of data (for static generation)
 * Useful for getStaticPaths pre-rendering
 */
export const getAllPages = async ({ cookies = {} } = {}) => {
  try {
    const response = await server({ cookies }).post(`/pages/search`, {
      search: { filters: [] },
      limit: 1000,
      page: 1,
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch all pages", error);
    return [];
  }
};

/**
 * Fetch all products for static path generation
 */
export const getAllProductSlugs = async ({ cookies = {} } = {}) => {
  try {
    const response = await server({ cookies }).post(`/products/search`, {
      search: { filters: [] },
      limit: 1000,
      page: 1,
    });
    return response.data?.data?.map((p) => p.slug) || [];
  } catch (error) {
    console.error("Failed to fetch product slugs", error);
    return [];
  }
};

/**
 * Fetch all blogs for static path generation
 */
export const getAllBlogSlugs = async ({ cookies = {} } = {}) => {
  try {
    const response = await server({ cookies }).post(`/contents/search`, {
      search: { filters: [] },
      limit: 1000,
      page: 1,
    });
    return response.data?.data?.map((c) => c.slug) || [];
  } catch (error) {
    console.error("Failed to fetch blog slugs", error);
    return [];
  }
};

/**
 * Fetch all categories for static path generation
 */
export const getAllCategorySlugs = async ({ cookies = {} } = {}) => {
  try {
    const response = await server({ cookies }).post(`/categories/search`, {
      search: { filters: [] },
      limit: 1000,
      page: 1,
    });
    return response.data?.data?.map((c) => c.slug) || [];
  } catch (error) {
    console.error("Failed to fetch category slugs", error);
    return [];
  }
};
