import React from "react";
import { IoMdClose } from "react-icons/io";
import PriceRange from "./PriceRange";
import Link from "next/link";
import Image from "next/image";
import { handleImageLink } from "@/helpers/functions";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";

const ShopSidebar = ({
  showSidebar,
  setShowSidebar,
  handleResetFilters,
  priceRange,
  setPriceRange,
  selectedBrand,
  setSelectedBrand,
  setCurrentPage,
  products,
}) => {
  return (
    <div className={showSidebar ? "shop-sidebar active" : "shop-sidebar"}>
      <div className="head d-flex justify-content-between align-items-center gap-3">
        <button
          type="button"
          aria-label="close sidebar"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <IoMdClose size={25} />
        </button>

        <button
          type="button"
          className="filter-btn"
          aria-label="filter"
          onClick={handleResetFilters}
        >
          حذف الفلاتر
        </button>
      </div>

      <div className="widget">
        <h3>السعر</h3>
        <div className="price-range-wrap">
          <PriceRange value={priceRange} onChange={setPriceRange} />
        </div>
      </div>
      <div className="widget">
        <h3>العلامة التجارية</h3>
        <ul>
          <li>
            <button
              className={selectedBrand === 1 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 1 ? null : 1);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (4) أبل
            </button>
          </li>
          <li>
            <button
              className={selectedBrand === 2 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 2 ? null : 2);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (6) سامسونج
            </button>
          </li>
          <li>
            <button
              className={selectedBrand === 3 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 3 ? null : 3);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (3) هواوي
            </button>
          </li>
          <li>
            <button
              className={selectedBrand === 4 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 4 ? null : 4);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (2) شاومي
            </button>
          </li>
          <li>
            <button
              className={selectedBrand === 5 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 5 ? null : 5);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (1) أوبو
            </button>
          </li>
          <li>
            <button
              className={selectedBrand === 6 ? "active" : ""}
              onClick={() => {
                setSelectedBrand(selectedBrand === 6 ? null : 6);
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              (2) فيفو
            </button>
          </li>
        </ul>
      </div>

      <div className="widget">
        <h3>المنتجات المميزة</h3>
        {products?.map((product) => {
          if (product.is_featured)
            return (
              <div key={product.id} className="featured-product d-flex gap-3">
                <div className="img">
                  <Image
                    src={handleImageLink(product.image)}
                    alt={product.name}
                    width={80}
                    height={80}
                  />
                  <Link href={`/products/${product?.slug}`}>

                  </Link>
                </div>
                <div className="info">
                  <h4>
                    <Link href={`/products/${product?.slug}`}>
                      {product.name}
                    </Link>
                  </h4>
                  <span className="price">
                    {product.price}
                    <SaudiRiyalIcon width={20} height={20} stroke="#000" />
                  </span>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default ShopSidebar;
