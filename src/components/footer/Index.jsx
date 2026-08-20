import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline, MdOutlinePhoneInTalk } from "react-icons/md";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

const Index = () => {
  const router = useRouter();
  const { settings } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  const handleCategoryClick = (event, slug) => {
    event.preventDefault();
    if (!slug) return;
    router.push(`/categories/${slug}`);
  };

  return (
    <div className={styles["footer-section"]}>
      <Container>
        <div className="footer-top">
          <Row className="justify-content-between">
            <Col lg={3} xs={12}>
              <div className="footer-info">
                <Image
                  src={settings?.logo || ""}
                  alt="Logo"
                  width={140}
                  height={80}
                />
                <p className="desc">
                  {
                    settings?.static_strings?.find(
                      (item) => item.key === "appDesc",
                    )?.value
                  }
                </p>
                <ul>
                  <li className="d-flex align-items-center gap-3">
                    <MdOutlinePhoneInTalk size={20} color="#fff" />

                    <Link
                      href={`tel:${settings?.contact_phone?.split("/")[4]}`}
                    >
                      {settings?.contact_phone?.split("/")[4]}
                    </Link>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <MdOutlineMailOutline size={20} color="#fff" />

                    <Link
                      href={`mailto:${settings?.contact_email?.split("/")[4]}`}
                    >
                      {settings?.contact_email?.split("/")[4]}
                    </Link>
                  </li>
                </ul>
                <div className="socials d-flex align-items-center gap-3">
                  {settings?.social_icons?.find(
                    (item) => item.platform === "instagram",
                  ) && (
                    <Link
                      href={
                        settings?.social_icons?.find(
                          (item) => item.platform === "instagram",
                        )?.url || "#"
                      }
                    >

                      <FiInstagram />

                    </Link>
                  )}
                  {settings?.social_icons?.find(
                    (item) => item.platform === "facebook",
                  ) && (
                    <Link
                      href={
                        settings?.social_icons?.find(
                          (item) => item.platform === "facebook",
                        )?.url || "#"
                      }
                    >

                      <FaFacebookF />

                    </Link>
                  )}
                  {settings?.social_icons?.find(
                    (item) => item.platform === "linkedin",
                  ) && (
                    <Link
                      href={
                        settings?.social_icons?.find(
                          (item) => item.platform === "linkedin",
                        )?.url || "#"
                      }
                    >

                      <FaLinkedinIn />

                    </Link>
                  )}
                  {settings?.social_icons?.find(
                    (item) => item.platform === "twitter",
                  ) && (
                    <Link
                      href={
                        settings?.social_icons?.find(
                          (item) => item.platform === "twitter",
                        )?.url || "#"
                      }
                    >

                      <FaXTwitter />

                    </Link>
                  )}
                  {settings?.social_icons?.find(
                    (item) => item.platform === "tiktok",
                  ) && (
                    <Link
                      href={
                        settings?.social_icons?.find(
                          (item) => item.platform === "tiktok",
                        )?.url || "#"
                      }
                    >

                      <FaTiktok />

                    </Link>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={8} xs={12}>
              <Row>
                <Col lg={3} xs={6}>
                  <div className="footer-item">
                    <h4>روابط سريعة</h4>
                    <ul>
                      <li>
                        <Link href={"/"}>
                          الرئيسية
                        </Link>
                      </li>
                      <li>
                        <Link href={"/shop"}>
                          المتجر
                        </Link>
                      </li>
                      <li>
                        <Link href={"/services"}>
                          الخدمات
                        </Link>
                      </li>
                      <li>
                        <Link href={"/blogs"}>
                          المقالات
                        </Link>
                      </li>
                      <li>
                        <Link href={"/contact"}>
                          تواصل معنا
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={6} xs={12}>
                  <div className="footer-item">
                    <h4>الأقسام</h4>
                    <ul className="d-flex gap-2 categories">
                      {categories?.data?.map((item) => (
                        <li key={item?.id || item?.slug}>
                          <Link
                            href={`/categories/${item?.slug}`}
                            onClick={(event) =>
                              handleCategoryClick(event, item?.slug)
                            }>

                            {item?.name}

                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>

                <Col lg={3} xs={6}>
                  <div className="footer-item">
                    <h4> الحساب والمستخدم</h4>
                    <ul>
                      {user ? (
                        <>
                          <li>
                            <Link href={"/profile"}>
                              حسابي
                            </Link>
                          </li>
                          <li>
                            <Link href={"/profile/orders"}>
                              طلباتي
                            </Link>
                          </li>
                          <li>
                            <Link href={"/profile/wishlist"}>
                               قائمة الرغبات
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href={"/"}>
                              تسجيل الدخول
                            </Link>
                          </li>
                          <li>
                            <Link href={"/"}>
                              إنشاء حساب
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">
          <p>
            {
              settings?.static_strings?.find(
                (item) => item.key === "copyrights",
              )?.value
            }
          </p>
        </div>
        {settings?.social_icons?.find(
          (item) => item.platform === "whatsapp",
        ) && (
          <div className="whatsapp-float">
            <Link
              href={
                settings?.social_icons?.find(
                  (item) => item.platform === "whatsapp",
                )?.url || "#"
              }
              target="_blank"
              rel="noopener noreferrer">

              <FaWhatsapp size={30} color="#fff" />
              <span>1</span>

            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Index;
