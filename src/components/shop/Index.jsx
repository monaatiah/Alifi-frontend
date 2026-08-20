import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";

import ProductBlock from "@/components/Shared/ProductBlock";
import FilterWrap from "./FilterWrap";
import ShopSidebar from "./ShopSidebar";
import Pagination from "@/components/Shared/Pagination";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { useProductFilters } from "../../hooks/useProductFilters";

const Index = () => {
  const { products, loading } = useSelector((state) => state.products);
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
  } = useProductFilters();

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <Row>
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
              products={products}
            />
          </Col>

          <Col lg={9}>
            {loading ? (
              <LoadingState />
            ) : products?.data && products.data.length > 0 ? (
              <>
                <Row className={`${layoutView === "list" ? "list" : ""}`}>
                  {products.data.map((item) => (
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
                  totalPages={products?.last_page}
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
