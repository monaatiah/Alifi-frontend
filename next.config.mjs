// next.config.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";

import bundleAnalyzer from "@next/bundle-analyzer";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";

// الدومينات المسموحة للصور والفيديوهات
const REMOTE_IMAGE_PATTERNS = [
  { protocol: "https", hostname: "my.alifi.pet" },
  { protocol: "https", hostname: "alifi.sa" },
  { protocol: "http", hostname: "localhost" },
];

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  media-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' https: http: ws: wss:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
   frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com;
  child-src 'self' https://www.google.com https://maps.google.com https://*.google.com;
  upgrade-insecure-requests;
`.replace(/\n/g, " ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // المشروع يعيش داخل ريبو Laravel — ثبّت جذر التتبّع على مجلد الواجهة
  outputFileTracingRoot: projectRoot,
  // OpenNext يجمّع الـ worker بشرط "edge-light"؛ تتبّع Next الافتراضي لا ينسخ
  // ملفات emotion الخاصة بهذا الشرط (تصل عبر react-select) فيفشل الـ bundling.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/@emotion/**"],
  },
  // next-redux-wrapper يستدعي useRouter؛ تركه خارج الحزمة (external) يمنحه نسخة
  // ثانية من RouterContext فينهار الرندر داخل Cloudflare Worker.
  transpilePackages: ["next-redux-wrapper"],
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: REMOTE_IMAGE_PATTERNS,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    // Cloudflare Workers لا يوفّر محسّن صور Next افتراضيًا.
    // فعّل الـ IMAGES binding في wrangler.jsonc قبل تحويلها إلى false.
    unoptimized: true,
  },

  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: false,
  },

  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/_next/static/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },

  webpack(config, { dev, isServer }) {
    // ✅ خلي كل SVG React component افتراضيًا
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // ✅ في التطوير: امنع eval-based source maps (للعميل فقط)
    if (dev && !isServer) config.devtool = "cheap-module-source-map";

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);

// يتيح الوصول إلى bindings الخاصة بـ Cloudflare أثناء `next dev` فقط.
// تشغيله خارج التطوير (build / jest) يفتح wrangler proxy لا ينتهي ويعلّق العملية.
if (isDev) {
  initOpenNextCloudflareForDev();
}
