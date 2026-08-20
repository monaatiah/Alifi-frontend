/**
 * Component Registry - Maps content types/component slugs to actual React components
 * This allows CMS to dynamically render components without hardcoding
 */

import dynamic from "next/dynamic";

// Shared/Layout Components
const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});
const InnerHead = dynamic(() => import("@/components/inner-head/Index"), {
  ssr: false,
});
const Breadcrumb = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  { ssr: false },
);
const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

// Hero/Intro Components
const HeroSection = dynamic(() => import("@/components/hero-section/Index"), {
  ssr: false,
});

// Content-specific Components
const SingleProduct = dynamic(
  () => import("@/components/single-product/Index"),
  { ssr: false },
);
const SingleBlog = dynamic(() => import("@/components/single-blog/Index"), {
  ssr: false,
});
const SingleCategory = dynamic(
  () => import("@/components/single-category/Index"),
  { ssr: false },
);
const SingleService = dynamic(
  () => import("@/components/single-service/Index"),
  { ssr: false },
);

// Section/Feature Components
const AboutSection = dynamic(() => import("@/components/about-section/Index"), {
  ssr: false,
});
const ShopSection = dynamic(() => import("@/components/shop-section/Index"), {
  ssr: false,
});
const ProductsSection = dynamic(
  () => import("@/components/products-section/Index"),
  { ssr: false },
);
const CategoriesSection = dynamic(
  () => import("@/components/categories/Index"),
  { ssr: false },
);
const ServicesSection = dynamic(() => import("@/components/services/Index"), {
  ssr: false,
});
const ServicesPageSection = dynamic(
  () => import("@/components/services-page-section/Index"),
  { ssr: false },
);
const BlogsSection = dynamic(() => import("@/components/blogs-section/Index"), {
  ssr: false,
});
const BlogsPageSection = dynamic(
  () => import("@/components/blogs-page-section/Index"),
  { ssr: false },
);
const WhySection = dynamic(() => import("@/components/why-section/Index"), {
  ssr: false,
});
const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});
const OurVisionSection = dynamic(
  () => import("@/components/our-vision/Index"),
  { ssr: false },
);
const WelcomeSection = dynamic(() => import("@/components/welcome/Index"), {
  ssr: false,
});
const ReviewsSection = dynamic(
  () => import("@/components/reviews-section/Index"),
  { ssr: false },
);
const WorkHoursSection = dynamic(
  () => import("@/components/work-hours/Index"),
  { ssr: false },
);

// Related/Related Content
const RelatedProducts = dynamic(
  () => import("@/components/related-products/Index"),
  { ssr: false },
);

// Form Components
const ContactForm = dynamic(() => import("@/components/contact/Index"), {
  ssr: false,
});
const ContactVendor = dynamic(
  () => import("@/components/contact-vendor/Index"),
  {
    ssr: false,
  },
);
const PrizesSection = dynamic(() => import("@/components/prizes/Index"), {
  ssr: false,
});

// Special Pages
const NotFound = dynamic(() => import("@/components/not-found/Index"), {
  ssr: false,
});
const Empty = dynamic(() => import("@/components/empty/Index"), { ssr: false });

/**
 * Main component registry
 * Maps:
 * - componentType (how CMS identifies it)
 * - component (actual React component)
 * - canHaveData (if it accepts dynamic data props)
 */
export const COMPONENT_REGISTRY = {
  // Layout/Wrapper
  header: { component: Header, canHaveData: false },
  footer: { component: Footer, canHaveData: false },
  "inner-head": { component: InnerHead, canHaveData: false },
  breadcrumb: { component: Breadcrumb, canHaveData: false },

  // Hero/Intro
  hero: { component: HeroSection, canHaveData: false },

  // Single Content Display
  "single-product": { component: SingleProduct, canHaveData: true },
  "single-blog": { component: SingleBlog, canHaveData: true },
  "single-category": { component: SingleCategory, canHaveData: true },
  "single-service": { component: SingleService, canHaveData: true },

  // Section/Collection Display
  products: { component: ProductsSection, canHaveData: true },
  services: { component: ServicesSection, canHaveData: true },
  "services-page": { component: ServicesPageSection, canHaveData: true },
  categories: { component: CategoriesSection, canHaveData: true },
  blogs: { component: BlogsSection, canHaveData: true },
  "blogs-page": { component: BlogsPageSection, canHaveData: true },
  shop: { component: ShopSection, canHaveData: false },
  about: { component: AboutSection, canHaveData: false },
  why: { component: WhySection, canHaveData: false },
  "join-us": { component: JoinUsSection, canHaveData: false },
  reviews: { component: ReviewsSection, canHaveData: true },
  "work-hours": { component: WorkHoursSection, canHaveData: false },

  // Related Content
  "related-products": { component: RelatedProducts, canHaveData: true },

  // Forms
  contact: { component: ContactForm, canHaveData: false },
  "contact-vendor": { component: ContactVendor, canHaveData: false },

  // Extended sections
  "our-vision": { component: OurVisionSection, canHaveData: false },
  welcome: { component: WelcomeSection, canHaveData: false },

  // Special
  "not-found": { component: NotFound, canHaveData: false },
  empty: { component: Empty, canHaveData: false },

  // ── CMS component_identifier keys ──────────────────────────
  // These match the `component_identifier` field returned by /pages/actions/get-by-slug
  hero_slider: { component: HeroSection, canHaveData: false },
  features_section: { component: AboutSection, canHaveData: false },
  feature_grid: { component: AboutSection, canHaveData: false },
  categories_slider: { component: ShopSection, canHaveData: false },
  product_tabs: { component: ProductsSection, canHaveData: false },
  services: { component: ServicesSection, canHaveData: false },
  why_choose_us: { component: WhySection, canHaveData: false },
  apply_form: { component: JoinUsSection, canHaveData: false },
  testimonials: { component: ReviewsSection, canHaveData: false },
  blogs: { component: BlogsSection, canHaveData: false },
  blogs_hero: { component: Breadcrumb, canHaveData: false },
  shop_hero: { component: Breadcrumb, canHaveData: false },
  categories_hero: { component: Breadcrumb, canHaveData: false },
  hero_banner: { component: Breadcrumb, canHaveData: false },
  category_showcase: { component: ShopSection, canHaveData: false },
  about_wecome: { component: WelcomeSection, canHaveData: false },
  our_vision: { component: OurVisionSection, canHaveData: false },
  prizes: { component: PrizesSection, canHaveData: false },
  apply_vendor: { component: ContactVendor, canHaveData: false },
  order_status: { component: null, canHaveData: false },
  cart_best_seller_products: { component: ProductsSection, canHaveData: false },
};

/**
 * Get a component by its slug
 * @param {string} componentSlug - The component identifier
 * @returns {Component|null} - The React component or null if not found
 */
export const getComponentBySlug = (componentSlug) => {
  return COMPONENT_REGISTRY[componentSlug]?.component || null;
};

/**
 * Check if a component can accept dynamic data
 * @param {string} componentSlug - The component identifier
 * @returns {boolean} - Whether component accepts data
 */
export const canComponentHaveData = (componentSlug) => {
  return COMPONENT_REGISTRY[componentSlug]?.canHaveData || false;
};

/**
 * Get all registered component slugs
 * @returns {string[]} - Array of available component slugs
 */
export const getRegisteredComponents = () => {
  return Object.keys(COMPONENT_REGISTRY);
};

/**
 * Validate a component configuration
 * @param {Object} componentConfig - The component config from CMS
 * @returns {boolean} - Whether config is valid
 */
export const isValidComponentConfig = (componentConfig) => {
  if (!componentConfig || typeof componentConfig !== "object") return false;
  if (!componentConfig.slug) return false;
  if (!COMPONENT_REGISTRY[componentConfig.slug]) return false;
  return true;
};
