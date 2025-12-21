// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// الدومينات المسموحة للصور والفيديوهات
const IMG_DOMAINS = ["localhost"];

const isDev = process.env.NODE_ENV === "development";
const isNetlify = process.env.NETLIFY === "true";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self'${isDev ? " 'unsafe-eval'" : ""};
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

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  images: {
    domains: IMG_DOMAINS,
    remotePatterns: [{ protocol: "https", hostname: "google.com" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    loader: "default",
    unoptimized: isNetlify,
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
      {
        source: "/_next/future/image/:all*",
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
      rule.test?.test?.(".svg")
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
});
