import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getCategories, getPageData, getSettings } from "@/store/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getComponentByIdentifier, handleImageLink } from "@/helpers/functions";
import { NextSeo } from "next-seo";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const AboutSection = dynamic(() => import("@/components/about-section/Index"), {
  ssr: false,
});

const WelcomeSection = dynamic(() => import("@/components/welcome/Index"), {
  ssr: false,
});

const OurVisionSection = dynamic(
  () => import("@/components/our-vision/Index"),
  {
    ssr: false,
  },
);

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

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  const { locale, asPath } = useRouter();
  const { pageData } = useSelector((state) => state.settings);

  const testimonialsData = getComponentByIdentifier(
    pageData?.page_components,
    "testimonials",
  );

  const HeroData = getComponentByIdentifier(
    pageData?.page_components,
    "shop_hero",
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
      <BreadCrumbSection
        title={HeroData?.data?.title || ""}
        pageName="معلومات عنا"
        imageSrc={HeroData?.data?.image || ""}
      />
      <WelcomeSection />
      <AboutSection />
      <OurVisionSection />
      <WhySection />
      <JoinUsSection />
      <ReviewsSection testimonialsData={testimonialsData} />
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
        slug: "about",
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

export default SingleProductsPage;
