import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { GoStarFill } from "react-icons/go";
import Link from "next/link";
import { useSelector } from "react-redux";

const normalizeService = (singleService) =>
  singleService?.id != null ? singleService : (singleService?.data ?? singleService);

const getProviderName = (provider) =>
  provider?.name || provider?.title || provider?.slug || "مقدم خدمة";

const Index = () => {
  const { singleService } = useSelector((state) => state.services);
  const serviceData = normalizeService(singleService);
  const providers = useMemo(
    () =>
      Array.isArray(serviceData?.related_service_providers)
        ? serviceData.related_service_providers
        : [],
    [serviceData],
  );

  return (
    <div className={styles["shop-wrapper"]}>
      <Container>
        <div className="section-head d-flex align-items-center gap-3 justify-content-between">
          <h3>مقدمو الخدمة</h3>
        </div>
        <div className="services-wrap">
          <Row>
            {providers.length > 0 ? (
              providers.map((provider) => {
                const providerName = getProviderName(provider);
                const reviewsCount = Number(provider?.reviews_count || 0);
                const rating = Number(provider?.rating || provider?.rate || 0);

                return (
                  <Col
                    xxl={4}
                    lg={6}
                    md={6}
                    sm={12}
                    key={provider.id || provider.slug}
                  >
                    <div className="service-item d-flex align-items-center gap-3">
                      <div className="right d-flex flex-column gap-3 align-items-center">
                        <div className="img">
                          {provider?.logo_url ? (
                            <img
                              src={provider.logo_url}
                              alt={providerName}
                              width={100}
                              height={100}
                              loading="lazy"
                            />
                          ) : (
                            <span className="provider-placeholder">
                              {providerName.slice(0, 1)}
                            </span>
                          )}
                        </div>
                        <div className="rate">
                          {[...Array(5)].map((_, index) => (
                            <span key={index} className="star">
                              <GoStarFill
                                color={
                                  index < Math.round(rating)
                                    ? "#f2782b"
                                    : "#000"
                                }
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="left">
                        <div className="title">
                          <Link href={`/services/providers/${provider.slug}`}>
                            <a>{providerName}</a>
                          </Link>
                        </div>
                        <div className="desc">
                          <p>{provider?.short_description || ""}</p>
                        </div>
                        <div className="extra d-flex align-items-center gap-3 justify-content-between">
                          <div>
                            <div className="address">
                              التقييمات: <span>{reviewsCount}</span>
                            </div>
                          </div>
                          <Link href={`/services/providers/${provider.slug}`}>
                            <a aria-label="view provider details">
                              عرض التفاصيل
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <p>لا يوجد مقدمو خدمة مرتبطون بهذه الخدمة.</p>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
