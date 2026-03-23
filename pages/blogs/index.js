import React from "react";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCategories,
  getContent,
  getPageData,
  getSettings,
} from "@/store/actions";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const BreadCrumbSection = dynamic(
  () => import("@/components/breadcrumb-section/Index"),
  {
    ssr: false,
  },
);
import BlogsSection from "@/components/blogs-page-section/Index";

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const BlogsPage = () => {
  const { pageData } = useSelector((state) => state.settings);
  const blogsHeroData = getComponentByIdentifier(
    pageData?.page_components,
    "blogs_hero",
  );

  return (
    <>
      <Header />
      <BreadCrumbSection
        title={blogsHeroData?.data?.title || ""}
        description={blogsHeroData?.data?.description || ""}
        pageName={blogsHeroData?.data?.title || ""}
        imageSrc={blogsHeroData?.data?.image || ""}
      />
      <BlogsSection />
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
        slug: "blogs",
      }),
    );

    store.dispatch(
      getContent({
        cookies: {},
        filters: [{ field: "content_type_id", operator: "=", value: 2 }],

        limit: 20,
        page: 1,
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

export default BlogsPage;
