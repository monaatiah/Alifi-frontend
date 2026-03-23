import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "@/store/products/actions";
import { getCategoryProducts } from "@/store/categories/actions";

export const useProductFilters = ({ categorySlug = null } = {}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstRender = useRef(true);

  const buildFilters = useCallback(() => {
    const filters = [{ field: "status", operator: "=", value: "published" }];

    if (searchText.trim()) {
      filters.push({
        field: "name",
        operator: "like",
        value: `%${searchText}%`,
      });
    }

    if (priceRange.min > 0 || priceRange.max < 10000) {
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
  }, [searchText, priceRange, selectedBrand]);

  const applyFilters = useCallback(() => {
    const filters = buildFilters();
    const sorts = sortOrder
      ? [{ field: "created_at", direction: sortOrder }]
      : [];

    const minPrice = priceRange.min > 0 ? priceRange.min : null;
    const maxPrice = priceRange.max < 10000 ? priceRange.max : null;
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
    setPriceRange({ min: 0, max: 10000 });
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
  };
};
