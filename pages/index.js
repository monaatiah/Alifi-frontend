import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getPageData, getSettings } from "@/store/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getComponentByIdentifier, handleImageLink } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const HeroSection = dynamic(() => import("@/components/hero-section/Index"), {
  ssr: false,
});

const AboutSection = dynamic(() => import("@/components/about-section/Index"), {
  ssr: false,
});

const ShopSection = dynamic(() => import("@/components/shop-section/Index"), {
  ssr: false,
});

const ProductsSection = dynamic(
  () => import("@/components/products-section/Index"),
  {
    ssr: false,
  },
);

const ServicesSection = dynamic(() => import("@/components/services/Index"), {
  ssr: false,
});

const WhySection = dynamic(() => import("@/components/why-section/Index"), {
  ssr: false,
});

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const ReviewsSection = dynamic(
  () => import("@/components/reviews-section/Index"),
  {
    ssr: false,
  },
);

const BlogsSection = dynamic(() => import("@/components/blogs-section/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const Home = () => {
  const { locale, asPath } = useRouter();
  const { pageData } = useSelector((state) => state.settings);
  const blogsData = getComponentByIdentifier(
    pageData?.page_components,
    "blogs",
  );

  const testimonialsData = getComponentByIdentifier(
    pageData?.page_components,
    "testimonials",
  );

  return (
    <>
      <NextSeo
        title={`${pageData?.meta?.title}`}
        description={pageData?.meta?.description}
        openGraph={{
          title: pageData?.meta?.title,
          description: pageData?.meta?.description,
          images: [
            {
              url: handleImageLink(pageData?.seo?.image?.[locale]),
              width: 800,
              height: 600,
              alt: pageData?.seo?.title,
            },
          ],
        }}
        canonical={
          typeof window !== "undefined"
            ? window.location.href
            : `${process.env.NEXT_PUBLIC_SITE_URL}/${asPath}`
        }
        twitter={{
          cardType: "summary_large_image",
          handle: "@handle",
          site: "@site",
          title: pageData?.seo?.title?.[locale],
          description: pageData?.seo?.description?.[locale],
          image: handleImageLink(pageData?.seo?.image?.[locale]),
        }}
      />
      <Header />
      <HeroSection />
      <AboutSection />
      <ShopSection />
      <ProductsSection />
      <ServicesSection />
      <WhySection />
      <JoinUsSection />
      <ReviewsSection testimonialsData={testimonialsData} />
      <BlogsSection
        title={blogsData?.data?.title}
        subTitle={blogsData?.data?.subtitle}
      />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(
      getSettings({
        cookies: {},
      }),
    );
    store.dispatch(
      getPageData({
        cookies: {},
        slug: "home",
      }),
    );
    store.dispatch(
      getCategories({
        cookies: {},
      }),
    );

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default Home;
