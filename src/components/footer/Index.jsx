import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import Image from "next/future/image";
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
                      <a>{settings?.contact_phone?.split("/")[4]}</a>
                    </Link>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <MdOutlineMailOutline size={20} color="#fff" />

                    <Link
                      href={`mailto:${settings?.contact_email?.split("/")[4]}`}
                    >
                      <a>{settings?.contact_email?.split("/")[4]}</a>
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
                      <a>
                        <FiInstagram />
                      </a>
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
                      <a>
                        <FaFacebookF />
                      </a>
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
                      <a>
                        <FaLinkedinIn />
                      </a>
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
                      <a>
                        <FaXTwitter />
                      </a>
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
                      <a>
                        <FaTiktok />
                      </a>
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
                          <a>الرئيسية</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/shop"}>
                          <a>المتجر</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/services"}>
                          <a>الخدمات</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/blogs"}>
                          <a>المقالات</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/contact"}>
                          <a>تواصل معنا</a>
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
                          <Link href={`/categories/${item?.slug}`}>
                            <a
                              onClick={(event) =>
                                handleCategoryClick(event, item?.slug)
                              }
                            >
                              {item?.name}
                            </a>
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
                              <a>حسابي</a>
                            </Link>
                          </li>
                          <li>
                            <Link href={"/profile/orders"}>
                              <a>طلباتي</a>
                            </Link>
                          </li>
                          <li>
                            <Link href={"/profile/wishlist"}>
                              <a> قائمة الرغبات</a>
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href={"/"}>
                              <a>تسجيل الدخول</a>
                            </Link>
                          </li>
                          <li>
                            <Link href={"/"}>
                              <a>إنشاء حساب</a>
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
            >
              <a target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} color="#fff" />
                <span>1</span>
              </a>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Index;
