import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getCheckoutFormSchema,
  getCountries,
  getPageData,
  getPaymentMethods,
  getSettings,
  getShippingMethods,
} from "@/store/actions";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { handleImageLink } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const CheckoutSection = dynamic(() => import("@/components/checkout/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  const { locale, asPath } = useRouter();
  const { pageData } = useSelector((state) => state.settings);

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
      <BreadCrumbSection title="الدفع" pageName="الدفع" paymentPages />
      <CheckoutSection />
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
        slug: "checkout",
      }),
    );

    store.dispatch(
      getCategories({
        cookies: {},
      }),
    );

    store.dispatch(getCheckoutFormSchema({ cookies: {} }));
    store.dispatch(getPaymentMethods({ cookies: {} }));
    store.dispatch(getShippingMethods({ cookies: {} }));
    store.dispatch(getCountries({ cookies: {} }));

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
