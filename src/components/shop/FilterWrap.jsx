import React from "react";
import { GoSearch } from "react-icons/go";
import { FaListUl, FaFilter } from "react-icons/fa6";
import { BsGrid3X3Gap } from "react-icons/bs";

const FilterWrap = ({
  searchText,
  setSearchText,
  sortOrder,
  setSortOrder,
  setShowSidebar,
  layoutView,
  setLayoutView,
}) => {
  return (
    <div className="shop-filter d-flex justify-content-between align-items-center gap-3">
      <div className="inputs-wrap d-flex align-items-center gap-3">
        <div className="search">
          <GoSearch
            color="#fff"
            style={{
              position: "absolute",
              left: "10px",
              pointerEvents: "none",
            }}
          />
          <input
            type="search"
            className="form-control"
            placeholder="ابحث عن منتج...."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <select
          className="form-select form-control"
          aria-label="Default select example"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">فرز حسب</option>
          <option value="asc">الأحدث</option>
          <option value="desc">الأقدم</option>
        </select>
      </div>

      <button
        type="button"
        className="open-filter"
        aria-label="open filter"
        onClick={() => {
          setShowSidebar(true);
        }}
      >
        <FaFilter />
        فلتر المنتجات
      </button>

      <button
        type="button"
        className="filter-btn"
        aria-label="filter button"
        onClick={() => {
          setLayoutView(layoutView === "grid" ? "list" : "grid");
        }}
      >
        {layoutView === "list" ? (
          <BsGrid3X3Gap color="#fff" size={22} />
        ) : (
          <FaListUl color="#fff" size={22} />
        )}
      </button>
    </div>
  );
};

export default FilterWrap;
