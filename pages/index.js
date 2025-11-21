import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getPageData, getSettings, getSectionData } from "@/store/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { handleImageLink } from "@/helpers/functions";

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
  }
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
  }
);

const BlogsSection = dynamic(() => import("@/components/blogs-section/Index"), {
  ssr: false,
});

const Home = () => {
  const { locale, asPath } = useRouter();

  return (
    <>
      {/* <NextSeo
        title={`${sectionData?.metaTitle?.[locale]} | ${settings?.appName?.[locale]}`}
        description={sectionData?.metaDescription?.[locale]}
        openGraph={{
          title: sectionData?.metaTitle?.[locale],
          description: sectionData?.metaDescription?.[locale],
          images: [
            {
              url: handleImageLink(settings?.appLogo),
              width: 800,
              height: 600,
              alt: sectionData?.metaTitle?.[locale],
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
          title: sectionData?.metaTitle?.[locale],
          description: sectionData?.metaDescription?.[locale],
          image: handleImageLink(settings?.appLogo),
        }}
      /> */}
      <Header />
      <HeroSection />
      <AboutSection />
      <ShopSection />
      <ProductsSection />
      <ServicesSection />
      <WhySection />
      <JoinUsSection />
      <ReviewsSection />
      <BlogsSection />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    // store.dispatch(
    //   getSettings({
    //     cookies: {},
    //   })
    // );
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default Home;
