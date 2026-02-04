import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);

const ShopServices = dynamic(() => import("@/components/shop-services/Index"), {
  ssr: false,
});

const Shop = dynamic(() => import("@/components/shop/Index"), {
  ssr: false,
});

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ShopPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="كل ما تحتاجه لقطتك في مكان واحد"
        description="
اكتشف المنتجات المختارة للقطط من أغذية، عناية، ألعاب، وإكسسوارات من أفضل البائعين"
        pageName="القطط"
      />
      <ShopServices />
      <Shop />
      <JoinUsSection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default ShopPage;
