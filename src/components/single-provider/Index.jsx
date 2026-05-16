import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import Image from "next/future/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { useSelector } from "react-redux";
import ProductBlock from "@/components/Shared/ProductBlock";

import CallIcon from "./assets/phone.svg";
import ChatIcon from "./assets/chat.svg";
import WhatsAppIcon from "./assets/whatsapp.svg";
import AvatarIcon from "./assets/dog.png";

const Index = () => {
  const { singleProvider } = useSelector((state) => state.services);

  const provider = singleProvider?.provider || singleProvider || {};
  const providerServices = Array.isArray(singleProvider?.services?.data)
    ? singleProvider.services.data
    : [];

  const providerName = provider.name || "مقدم الخدمة";
  const providerDescription = provider.description || "";
  const providerImage = provider.profile_image_url || AvatarIcon;
  const providerEmail = provider.contact?.email || "";
  const providerPhone = provider.contact?.phone || "";
  const providerWhatsApp = providerPhone.replace(/\D/g, "");
  const providerAddress =
    provider.contact?.address ||
    provider.locations?.[0]?.address ||
    "غير متوفر";

  const serviceProducts = useMemo(
    () =>
      providerServices.map((service) => ({
        id: service.id,
        slug: service.slug,
        href: `/services/${service.slug}`,
        kind: "service",
        name: service.title || "خدمة",
        description: service.short_description || service.description || "",
        image: service.cover_url || AvatarIcon,
        price: service.base_price || 0,
        quantity: 1,
      })),
    [providerServices],
  );

  return (
    <div className={styles["profile-section"]}>
      <Container>
        <div className="author-wrap d-flex align-items-start gap-3 justify-content-between">
          <div className="author d-flex align-items-center gap-3">
            <div className="img">
              <Image
                src={providerImage}
                alt={providerName}
                width={110}
                height={110}
              />
            </div>
            <div className="info">
              <h3>{providerName}</h3>
              <p>{providerAddress}</p>
              <div className="rating d-flex align-items-center gap-4">
                {provider.reviews?.count || 0} تقييم
                <div className="stars d-flex align-items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      <GoStarFill
                        color={
                          index <
                          Math.round(
                            Number(provider.reviews?.average_rating || 0),
                          )
                            ? "#f2782b"
                            : "#ccc"
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="action-btns d-flex align-items-center gap-4">
            <Link
              href={
                provider.slug
                  ? `/services/providers/${provider.slug}`
                  : "/profile"
              }
            >
              <a className="btn">زيارة الموقع</a>
            </Link>
            <div className="icons d-flex align-items-center gap-2">
              <Link href={providerPhone ? `tel:${providerPhone}` : "#"}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <CallIcon />
                </a>
              </Link>
              <Link href={providerEmail ? `mailto:${providerEmail}` : "#"}>
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <ChatIcon />
                </a>
              </Link>
              <Link
                href={
                  providerWhatsApp ? `https://wa.me/${providerWhatsApp}` : "#"
                }
              >
                <a className="rounded-circle d-flex align-items-center justify-content-center">
                  <WhatsAppIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="description">
          <h1>{providerName}</h1>
          <p>{providerDescription}</p>
        </div>

        <div className="products">
          <h2>الخدمات</h2>
          <Row>
            {serviceProducts.length > 0 ? (
              serviceProducts.map((service) => (
                <Col lg={3} md={4} xs={12} key={service.id}>
                  <ProductBlock item={service} />
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <p className="text-center mb-0">لا توجد خدمات متاحة حالياً.</p>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Index;
