import React, { useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import Image from "next/future/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { FiTrash2 } from "react-icons/fi";
import styles from "./Wishlist.module.scss";
import { handleImageLink } from "@/helpers/functions";
import {
  getWishlist,
  toggleToWishlist,
} from "@/store/cart/actions";
import {
  getFavoritesServices,
  removeServiceFromFavorites,
} from "@/store/services/actions";

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  return [];
};

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading: cartLoading } = useSelector((state) => state.cart);
  const {
    favouriteServices,
    loading: servicesLoading,
  } = useSelector((state) => state.services);

  const wishlistItems = useMemo(
    () => normalizeItems(wishlist),
    [wishlist],
  );

  const favoriteServices = useMemo(
    () => normalizeItems(favouriteServices),
    [favouriteServices],
  );

  useEffect(() => {
    const cookies = parseCookies();
    dispatch(getWishlist({ cookies }));
    dispatch(getFavoritesServices({ cookies }));
  }, [dispatch]);

  const handleRemoveProduct = (item) => {
    const productId =
      item?.id || item?.product?.id || item?.product_id || item?.product_id;
    if (!productId) {
      return;
    }

    dispatch(
      toggleToWishlist({
        cookies: parseCookies(),
        product_id: productId,
      }),
    );
  };

  const handleRemoveService = (serviceId) => {
    if (!serviceId) {
      return;
    }

    dispatch(
      removeServiceFromFavorites({
        cookies: parseCookies(),
        service_id: serviceId,
      }),
    );
  };

  const hasProducts = wishlistItems.length > 0;
  const hasServices = favoriteServices.length > 0;
  const isLoading = cartLoading || servicesLoading;

  return (
    <div className={styles["wishlist-page"]}>
      <Container>
        <div className={styles["page-head"]}>
          <div>
            <span className={styles["page-label"]}>المفضلة</span>
            <h2>قائمة المنتجات والخدمات المفضلة</h2>
          </div>
        </div>

        {isLoading ? (
          <div className={styles["empty-state"]}>جاري تحميل القائمة...</div>
        ) : (
          <>
            {!hasProducts && !hasServices ? (
              <div className={styles["empty-state"]}>
                لا توجد عناصر في قائمة المفضلة بعد.
              </div>
            ) : (
              <div className={styles["wishlist-sections"]}>
                <section className={styles["wishlist-section"]}>
                  <div className={styles["section-head"]}>
                    <h3>المنتجات</h3>
                    <span>{wishlistItems.length} منتج</span>
                  </div>

                  {hasProducts ? (
                    <div className={styles["item-grid"]}>
                      {wishlistItems.map((item) => {
                        const product = item?.product || item;
                        const productSlug = product?.slug || product?.id;
                        const productName = product?.name || product?.title || "منتج";
                        const productImage = handleImageLink(product?.image);
                        const productPrice =
                          product?.sale_price || product?.price || "-";

                        return (
                          <article
                            className={styles["item-card"]}
                            key={product?.id || item?.id || productSlug}
                          >
                            <div className={styles["item-media"]}>
                              <Link href={`/products/${productSlug}`}>
                                <a>
                                  <Image
                                    src={productImage}
                                    alt={productName}
                                    width={140}
                                    height={140}
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className={styles["item-body"]}>
                              <Link href={`/products/${productSlug}`}>
                                <a className={styles["item-title"]}>
                                  {productName}
                                </a>
                              </Link>
                              <p className={styles["item-meta"]}>
                                السعر: {productPrice} ر.س
                              </p>
                              <div className={styles["item-actions"]}>
                                <button
                                  type="button"
                                  className="btn btn-remove"
                                  onClick={() => handleRemoveProduct(item)}
                                >
                                  <FiTrash2 />
                                  إزالة
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={styles["empty-section"]}>
                      لا توجد منتجات مفضلة.
                    </div>
                  )}
                </section>

                <section className={styles["wishlist-section"]}>
                  <div className={styles["section-head"]}>
                    <h3>الخدمات</h3>
                    <span>{favoriteServices.length} خدمة</span>
                  </div>

                  {hasServices ? (
                    <div className={styles["item-grid"]}>
                      {favoriteServices.map((service) => {
                        const serviceSlug = service?.slug || service?.id;
                        const serviceName = service?.title || service?.name || "خدمة";
                        const serviceImage = handleImageLink(service?.image);
                        const servicePrice =
                          service?.price || service?.sale_price || "-";

                        return (
                          <article
                            className={styles["item-card"]}
                            key={service?.id || serviceSlug}
                          >
                            <div className={styles["item-media"]}>
                              <Link href={`/services/${serviceSlug}`}>
                                <a>
                                  <Image
                                    src={serviceImage}
                                    alt={serviceName}
                                    width={140}
                                    height={140}
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className={styles["item-body"]}>
                              <Link href={`/services/${serviceSlug}`}>
                                <a className={styles["item-title"]}>
                                  {serviceName}
                                </a>
                              </Link>
                              <p className={styles["item-meta"]}>
                                السعر: {servicePrice} ر.س
                              </p>
                              <div className={styles["item-actions"]}>
                                <button
                                  type="button"
                                  className="btn btn-remove"
                                  onClick={() => handleRemoveService(service?.id)}
                                >
                                  <FiTrash2 />
                                  إزالة
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={styles["empty-section"]}>
                      لا توجد خدمات مفضلة.
                    </div>
                  )}
                </section>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
