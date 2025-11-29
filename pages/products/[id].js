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
  }
);

const JoinUsSection = dynamic(() => import("@/components/join-us/Index"), {
  ssr: false,
});

const SingleProductsPage = () => {
  return (
    <>
      <Header />
      <BreadCrumbSection
        title="كل ما تحتاجه لقطتك في مكان واحد"
        description="
اكتشف المنتجات المختارة للقطط من أغذية، عناية، ألعاب، وإكسسوارات من أفضل البائعين"
        pageName="القطط"
      />

      <JoinUsSection />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params }) => {
    const { id } = params;
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleProductsPage;
