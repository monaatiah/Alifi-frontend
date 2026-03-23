import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";

import ProductBlock from "./ProductBlock";
import ShopSidebar from "./ShopSidebar";
import Pagination from "@/components/Shared/Pagination";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { useProductFilters } from "../../hooks/useProductFilters";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Link from "next/link";
import { ImageWithFallback } from "@/helpers/functions";
import FilterWrap from "./FilterWrap";

const Index = () => {
  const { singleCategory, loading } = useSelector((state) => state.categories);

  const [showSidebar, setShowSidebar] = useState(false);
  const [layoutView, setLayoutView] = useState("grid");

  const {
    searchText,
    setSearchText,
    sortOrder,
    setSortOrder,
    priceRange,
    setPriceRange,
    selectedBrand,
    setSelectedBrand,
    currentPage,
    setCurrentPage,
    resetFilters,
  } = useProductFilters({ categorySlug: singleCategory?.slug });

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <Row>
          {singleCategory?.children && singleCategory?.children?.length > 0 && (
            <Col lg={12}>
              <div className="services-list">
                <Swiper
                  spaceBetween={40}
                  slidesPerView={5}
                  navigation={true}
                  modules={[Navigation]}
                  breakpoints={{
                    0: {
                      slidesPerView: 1.7,
                      spaceBetween: 15,
                    },
                    625: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                    1366: {
                      slidesPerView: 4,
                    },
                    1920: {
                      slidesPerView: 5,
                    },
                  }}
                >
                  {singleCategory?.children?.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="service-block">
                        <div className="img">
                          <ImageWithFallback
                            src={item?.icon}
                            alt={item?.name}
                            width={325}
                            height={325}
                          />
                          <Link href={`/categories/${item?.slug}`}>
                            <a> </a>
                          </Link>
                        </div>
                        <div className="info">
                          <h3>
                            <Link href={`/categories/${item?.slug}`}>
                              <a>{item?.name}</a>
                            </Link>
                          </h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
          )}
          <Col lg={12}>
            <FilterWrap
              searchText={searchText}
              setSearchText={setSearchText}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              setShowSidebar={setShowSidebar}
              layoutView={layoutView}
              setLayoutView={setLayoutView}
            />
          </Col>
          <Col lg={3}>
            <ShopSidebar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              handleResetFilters={resetFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              setCurrentPage={setCurrentPage}
              products={singleCategory?.products?.data}
            />
          </Col>

          <Col lg={9}>
            {loading ? (
              <LoadingState />
            ) : singleCategory?.products?.data &&
              singleCategory?.products?.data?.length > 0 ? (
              <>
                <Row className={`${layoutView === "list" ? "list" : ""}`}>
                  {singleCategory?.products?.data?.map((item) => (
                    <Col
                      key={item.id}
                      lg={layoutView === "grid" ? 4 : 12}
                      md={6}
                    >
                      <ProductBlock item={item} />
                    </Col>
                  ))}
                </Row>

                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={singleCategory?.products?.meta?.last_page}
                  maxPagesToShow={5}
                />
              </>
            ) : (
              <EmptyState />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
