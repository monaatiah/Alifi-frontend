import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { GoSearch, GoStarFill } from "react-icons/go";
import { MdMyLocation, MdClose } from "react-icons/md";
import dynamic from "next/dynamic";

import Link from "next/link";
import Image from "next/future/image";
import SaudiRiyalIcon from "@/assets/images/saudi-riyal.svg";
import PlaceholderImage from "@/assets/images/cover.png";
import FilterIcon from "./assets/filter.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getServicesProviders, getServicesCategories } from "@/store/actions";

const MapPicker = dynamic(() => import("@/components/Shared/MapPicker"), {
  ssr: false,
});

const EMPTY_FILTERS = {
  name: "",
  lat: "",
  lng: "",
  pet_id: "",
  min_price: "",
  max_price: "",
  rating: "",
  category_slug: "",
};

const Index = () => {
  const dispatch = useDispatch();

  const {
    providers,
    servicesPagination: providersPagination,
    servicesCategories: providersCategories,
    loading,
  } = useSelector((state) => state.services);

  const [showFilter, setShowFilter] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const normalizedCategories = useMemo(() => {
    if (Array.isArray(providersCategories)) {
      return providersCategories;
    }

    if (Array.isArray(providersCategories?.data)) {
      return providersCategories.data;
    }

    return [];
  }, [providersCategories]);

  const requestPayload = useMemo(() => {
    const payload = {
      page: currentPage,
      limit: providersPagination?.per_page || 20,
    };

    if (appliedFilters.name?.trim()) {
      payload.name = appliedFilters.name.trim();
    }

    if (appliedFilters.lat !== "") {
      payload.lat = Number(appliedFilters.lat);
    }

    if (appliedFilters.lng !== "") {
      payload.lng = Number(appliedFilters.lng);
    }

    if (appliedFilters.lat !== "" && appliedFilters.lng !== "") {
      payload.radius_km = 15;
    }

    if (appliedFilters.pet_id) {
      payload.pet_id = Number(appliedFilters.pet_id);
    }

    if (appliedFilters.category_slug?.trim()) {
      payload.category_slug = appliedFilters.category_slug.trim();
    }

    if (appliedFilters.min_price !== "") {
      payload.min_price = Number(appliedFilters.min_price);
    }

    if (appliedFilters.max_price !== "") {
      payload.max_price = Number(appliedFilters.max_price);
    }

    if (appliedFilters.rating) {
      payload.rating = Number(appliedFilters.rating);
    }

    return payload;
  }, [appliedFilters, currentPage, providersPagination?.per_page]);

  const sortedProviders = useMemo(() => {
    const list = Array.isArray(providers) ? [...providers] : [];

    switch (sortBy) {
      case "newest":
        return list.sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
        );
      case "oldest":
        return list.sort(
          (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0),
        );
      case "price_high":
        return list.sort(
          (a, b) =>
            Number(b.base_price ?? b.price ?? 0) -
            Number(a.base_price ?? a.price ?? 0),
        );
      case "price_low":
        return list.sort(
          (a, b) =>
            Number(a.base_price ?? a.price ?? 0) -
            Number(b.base_price ?? b.price ?? 0),
        );
      default:
        return list;
    }
  }, [providers, sortBy]);

  const pages = useMemo(() => {
    const lastPage = providersPagination?.last_page || 1;
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }, [providersPagination?.last_page]);

  const hasAppliedFilters = useMemo(
    () =>
      Object.values(appliedFilters).some(
        (value) => String(value || "").trim() !== "",
      ),
    [appliedFilters],
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setAppliedFilters({ ...filters });
  };

  const handleMapLocationPick = (lat, lng) => {
    const latStr = String(lat);
    const lngStr = String(lng);
    setFilters((prev) => ({ ...prev, lat: latStr, lng: lngStr }));
    setAppliedFilters((prev) => ({ ...prev, lat: latStr, lng: lngStr }));
    setCurrentPage(1);
    setShowMapModal(false);
  };

  const handleClearLocation = () => {
    setFilters((prev) => ({ ...prev, lat: "", lng: "" }));
    setAppliedFilters((prev) => ({ ...prev, lat: "", lng: "" }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setFilters((prev) => ({
        ...prev,
        min_price: "",
        max_price: "",
      }));
      setAppliedFilters((prev) => ({
        ...prev,
        min_price: "",
        max_price: "",
      }));
      setCurrentPage(1);
      return;
    }

    const [minPrice, maxPrice] = value.split("-");
    setFilters((prev) => ({
      ...prev,
      min_price: minPrice,
      max_price: maxPrice,
    }));
    setAppliedFilters((prev) => ({
      ...prev,
      min_price: minPrice,
      max_price: maxPrice,
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getServicesCategories({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getServicesProviders(requestPayload));
  }, [dispatch, requestPayload]);

  return (
    <div className={styles["providers-wrapper"]}>
      <Container>
        <form
          className="providers-filter d-flex justify-content-between align-items-center gap-3"
          onSubmit={handleSearchSubmit}
        >
          <div className="inputs-wrap d-flex align-items-center gap-3">
            <div className="search">
              <button type="submit" aria-label="search button">
                <GoSearch color="#fff" />
              </button>
              <input
                type="search"
                className="form-control"
                placeholder="ابحث...."
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">فرز حسب</option>
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="price_high">الأعلى سعراً</option>
              <option value="price_low">الأقل سعراً</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-3 btns">
            <button type="submit" className="btn" aria-label="submit">
              ابحث
            </button>
            <button
              type="button"
              className="filter-btn"
              aria-label="filter button"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <FilterIcon />
            </button>
          </div>
        </form>
        {showFilter && (
          <div className="filter-wrap d-flex align-items-start gap-3 flex-wrap">
            <div className="item">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => setShowMapModal(true)}
                >
                  <MdMyLocation size={18} />
                  {appliedFilters.lat !== "" ? "تغيير الموقع" : "تحديد الموقع"}
                </button>
                {appliedFilters.lat !== "" && (
                  <button
                    type="button"
                    className="btn btn-remove d-flex align-items-center gap-1"
                    style={{ fontSize: "0.85rem", minWidth: "100px" }}
                    onClick={handleClearLocation}
                  >
                    <MdClose size={16} />
                    مسح الموقع
                  </button>
                )}
              </div>
              {appliedFilters.lat !== "" && (
                <p
                  className="mt-1 mb-0"
                  style={{ fontSize: "0.8rem", color: "#fff" }}
                >
                  تم تحديد موقع · نطاق 15 كم
                </p>
              )}
            </div>
            <div className="item">
              <select
                className="form-select form-control"
                value={filters.pet_id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedCategory = normalizedCategories.find(
                    (category) => String(category.id) === selectedId,
                  );

                  setFilters((prev) => ({
                    ...prev,
                    pet_id: selectedId,
                    category_slug: selectedCategory?.slug || "",
                  }));
                  setAppliedFilters((prev) => ({
                    ...prev,
                    pet_id: selectedId,
                    category_slug: selectedCategory?.slug || "",
                  }));
                  setCurrentPage(1);
                }}
              >
                <option value="">الفئة</option>
                {normalizedCategories.map((category) => (
                  <option
                    key={category.id || category.slug}
                    value={category.id || ""}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <select
                className="form-select form-control"
                value={
                  filters.min_price !== "" && filters.max_price !== ""
                    ? `${filters.min_price}-${filters.max_price}`
                    : ""
                }
                onChange={handlePriceRangeChange}
              >
                <option value="">السعر</option>
                <option value="0-50">0 - 50</option>
                <option value="50-100">50 - 100</option>
                <option value="100-200">100 - 200</option>
                <option value="200-500">200 - 500</option>
              </select>
            </div>
            <div className="item">
              <select
                className="form-select form-control"
                value={filters.rating}
                onChange={(e) => {
                  const ratingValue = e.target.value;
                  setFilters((prev) => ({
                    ...prev,
                    rating: ratingValue,
                  }));
                  setAppliedFilters((prev) => ({
                    ...prev,
                    rating: ratingValue,
                  }));
                  setCurrentPage(1);
                }}
              >
                <option value="">التقييم</option>
                <option value="1">1 نجمة</option>
                <option value="2">2 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="5">5 نجوم</option>
              </select>
            </div>
            {hasAppliedFilters && (
              <div className="item">
                <button
                  type="button"
                  className="btn btn-remove d-flex align-items-center gap-1"
                  onClick={handleClearFilters}
                >
                  <MdClose size={16} />
                  مسح كل الفلاتر
                </button>
              </div>
            )}
          </div>
        )}

        <div className="providers-wrap">
          <Row>
            {sortedProviders.map((provider, idx) => {
              const providerTitle = provider.name || "خدمة توفرها";
              const providerDescription = provider.description || "";
              const providerRate = provider.reviews?.average_rating
                ? Number(provider.reviews.average_rating)
                : 0;
              const reviewCount = provider.reviews?.count || 0;
              const providerAddress =
                provider.locations?.[0]?.address ||
                provider.contact?.address ||
                "غير متوفر";
              const providerPrice = "";
              const providerPath = provider.slug || provider.id;
              const providerImage =
                (typeof provider.profile_image_url === "string" &&
                  provider.profile_image_url) ||
                PlaceholderImage;

              return (
                <Col
                  xxl={4}
                  lg={6}
                  md={6}
                  sm={12}
                  key={provider.id || provider.slug || idx}
                >
                  <div className="provider-item d-flex align-items-center gap-3">
                    <div className="right d-flex flex-column gap-3 align-items-center">
                      <div className="img">
                        <Image
                          src={providerImage}
                          alt={providerTitle}
                          width={100}
                          height={100}
                          loading="lazy"
                        />
                      </div>
                      <div className="rate">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className="star">
                            <GoStarFill
                              color={
                                providerRate > 0 &&
                                index < Math.round(providerRate)
                                  ? "#f2782b"
                                  : "#ccc"
                              }
                            />
                          </span>
                        ))}
                        <span
                          style={{ fontSize: "0.75rem", marginLeft: "4px" }}
                        >
                          {providerRate > 0
                            ? `${providerRate.toFixed(1)} (${reviewCount})`
                            : "بدون تقييمات"}
                        </span>
                      </div>
                    </div>
                    <div className="left">
                      <div className="title">
                        <Link href={`/services/providers/${providerPath}`}>
                          <a>{providerTitle}</a>
                        </Link>
                      </div>
                      <div className="desc">
                        <p>
                          {providerDescription.length > 70
                            ? `${providerDescription.substring(0, 70)}...`
                            : providerDescription}
                        </p>
                      </div>
                      <div className="extra d-flex align-items-center gap-3 justify-content-between">
                        <div>
                          <div className="address">
                            العنوان: <span>{providerAddress}</span>
                          </div>
                          {providerPrice && (
                            <div className="address">
                              السعر:{" "}
                              <span>
                                {providerPrice}{" "}
                                <SaudiRiyalIcon
                                  width={15}
                                  height={15}
                                  stroke="#000"
                                />
                              </span>
                            </div>
                          )}
                        </div>
                        <Link href={`/services/providers/${providerPath}`}>
                          <a aria-label="view details">عرض التفاصيل</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          {loading && (
            <p className="text-center mt-3">جاري تحميل مقدمي الخدمات...</p>
          )}

          {!loading && sortedProviders.length === 0 && (
            <p className="text-center mt-3">
              لا يوجد مقدمو خدمات مطابقون للفلاتر الحالية.
            </p>
          )}

          {pages.length > 0 && (
            <div className="global-pagination">
              <ul>
                <li>
                  <button
                    type="button"
                    aria-label="previous page"
                    className="action-btn"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    <FaArrowRight />
                  </button>
                </li>

                {pages.map((page) => (
                  <li key={page}>
                    <button
                      type="button"
                      className={page === currentPage ? "active" : ""}
                      aria-label={`page ${page}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    type="button"
                    aria-label="next page"
                    className="action-btn next-btn"
                    disabled={
                      currentPage >= (providersPagination?.last_page || 1)
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        prev < (providersPagination?.last_page || 1)
                          ? prev + 1
                          : prev,
                      )
                    }
                  >
                    <FaArrowLeft />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Container>

      <Modal
        show={showMapModal}
        onHide={() => setShowMapModal(false)}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>تحديد الموقع</Modal.Title>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="إغلاق"
            onClick={() => setShowMapModal(false)}
          />
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <MapPicker
            mapHeight="420px"
            defaultZoom={10}
            selectedZoom={14}
            selectedPosition={
              filters.lat !== "" && filters.lng !== ""
                ? [Number(filters.lat), Number(filters.lng)]
                : undefined
            }
            onChange={handleMapLocationPick}
          />
          <p className="px-3 pt-2 pb-1 mb-0" style={{ fontSize: "0.85rem" }}>
            انقر على الخريطة لتحديد موقعك · سيتم تطبيق نطاق بحث 15 كم تلقائيًا
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Index;
