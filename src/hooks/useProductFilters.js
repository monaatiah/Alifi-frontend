import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "@/store/products/actions";

export const useProductFilters = () => {
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

    dispatch(
      getProducts({
        cookies: {},
        filters,
        sorts,
        limit: 20,
        page: currentPage,
      }),
    );
  }, [dispatch, buildFilters, sortOrder, currentPage]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
