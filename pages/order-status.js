import React, { useEffect } from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getOrderDetails,
  getPageData,
  getSettings,
} from "@/store/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
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

const OrderStatus = dynamic(() => import("@/components/order-status/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  const dispatch = useDispatch();
  const { locale, asPath, query, isReady } = useRouter();
  const { pageData } = useSelector((state) => state.settings);

  useEffect(() => {
    if (!isReady) return;

    const orderId = Array.isArray(query?.orderId)
      ? query.orderId[0]
      : query?.orderId;

    if (!orderId) return;

    dispatch(
      getOrderDetails({
        cookies: {},
        orderId,
      }),
    );
  }, [dispatch, isReady, query?.orderId]);

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
        title="تأكيد الطلب"
        pageName="تأكيد الطلب"
        paymentPages
      />
      <OrderStatus />
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
        slug: "order-details",
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
