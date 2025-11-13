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

const Contact = dynamic(() => import("@/components/contact/Index"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const Jumbotron = dynamic(() => import("@/components/jumbotron/Index"), {
  ssr: false,
});

const ContactPage = () => {
  const { locale, asPath } = useRouter();
  const { sectionData, settings } = useSelector((state) => state.settings);

  return (
    <>
      <NextSeo
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
        keywords={sectionData?.metaKeywords?.[locale]}
        twitter={{
          cardType: "summary_large_image",
          handle: "@handle",
          site: "@site",
          title: sectionData?.metaTitle?.[locale],
          description: sectionData?.metaDescription?.[locale],
          image: handleImageLink(settings?.appLogo),
        }}
      />
      <Header />
      <Jumbotron />
      <Contact />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(getPageData({ cookies: {}, slug: "contact" }));
    store.dispatch(
      getSectionData({
        cookies: {},
        pageSlug: "seo",
        sectionSlug: "contact-us",
      })
    );
    store.dispatch(
      getSettings({
        cookies: {},
      })
    );
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default ContactPage;
