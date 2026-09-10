import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "@/store/products/actions";
import { getCategoryProducts } from "@/store/categories/actions";

const DEFAULT_PRICE_RANGE = { min: 0, max: 10000 };

export const useProductFilters = ({ categorySlug = null } = {}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState({ ...DEFAULT_PRICE_RANGE });
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstRender = useRef(true);

  const isPriceRangeNarrowed =
    priceRange.min > DEFAULT_PRICE_RANGE.min ||
    priceRange.max < DEFAULT_PRICE_RANGE.max;

  const buildFilters = useCallback(() => {
    const filters = [{ field: "status", operator: "=", value: "published" }];

    if (searchText.trim()) {
      filters.push({
        field: "name",
        operator: "like",
        value: `%${searchText}%`,
      });
    }

    if (isPriceRangeNarrowed) {
      filters.push(
        { field: "price", operator: ">=", value: priceRange.min },
        { field: "price", operator: "<=", value: priceRange.max },
      );
    }

    if (selectedBrand) {
      filters.push({
        field: "brand_id",
        operator: "=",
        value: selectedBrand,
      });
    }

    return filters;
  }, [searchText, priceRange, isPriceRangeNarrowed, selectedBrand]);

  const applyFilters = useCallback(() => {
    const filters = buildFilters();
    const sorts = sortOrder
      ? [{ field: "created_at", direction: sortOrder }]
      : [];

    const minPrice =
      priceRange.min > DEFAULT_PRICE_RANGE.min ? priceRange.min : null;
    const maxPrice =
      priceRange.max < DEFAULT_PRICE_RANGE.max ? priceRange.max : null;
    const categorySort =
      sortOrder === "asc"
        ? "newest"
        : sortOrder === "desc"
          ? "oldest"
          : "newest";

    if (categorySlug) {
      dispatch(
        getCategoryProducts({
          cookies: {},
          slug: categorySlug,
          min_price: minPrice,
          max_price: maxPrice,
          in_stock: null,
          on_sale: null,
          sort: categorySort,
          per_page: 20,
          page: currentPage,
        }),
      );
      return;
    }

    dispatch(
      getProducts({
        cookies: {},
        filters,
        sorts,
        limit: 20,
        page: currentPage,
      }),
    );
  }, [
    dispatch,
    buildFilters,
    sortOrder,
    currentPage,
    categorySlug,
    priceRange,
  ]);

  const resetFilters = useCallback(() => {
    setSearchText("");
    setSortOrder("");
    setPriceRange({ ...DEFAULT_PRICE_RANGE });
    setSelectedBrand(null);
    setCurrentPage(1);
  }, []);

  // Single unified effect - handles API call with debouncing
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      applyFilters();
      return;
    }

    const timer = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(timer);
  }, [
    currentPage,
    searchText,
    priceRange.min,
    priceRange.max,
    sortOrder,
    selectedBrand,
  ]);

  const hasActiveFilters =
    Boolean(searchText.trim()) || Boolean(selectedBrand) || isPriceRangeNarrowed;

  return {
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
    hasActiveFilters,
  };
};
