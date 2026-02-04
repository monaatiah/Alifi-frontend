import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import Image from "next/future/image";
import Link from "next/link";

import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline, MdOutlinePhoneInTalk } from "react-icons/md";

const Index = () => {
  const { settings } = useSelector((state) => state.settings);

  return (
    <div className={styles["footer-section"]}>
      <Container>
        <div className="footer-top">
          <Row className="align-items-center justify-content-between">
            <Col lg={4}>
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
                  <Link href="#">
                    <a>
                      <FiInstagram />
                    </a>
                  </Link>
                  <Link href="#">
                    <a>
                      <FaXTwitter />
                    </a>
                  </Link>
                  <Link href="#">
                    <a>
                      <FaFacebookF />
                    </a>
                  </Link>
                  <Link href="#">
                    <a>
                      <FaLinkedinIn />
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Row>
                <Col lg={4} xs={6}>
                  <div className="footer-item">
                    <h4>روابط سريعة</h4>
                    <ul>
                      <li>
                        <Link href={"/"}>
                          <a>الرئيسية</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>المتجر</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>الخدمات</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>المقالات</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>تواصل معنا</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={4} xs={6}>
                  <div className="footer-item">
                    <h4>الأقسام</h4>
                    <ul>
                      <li>
                        <Link href={"/"}>
                          <a>القطط</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>الكلاب</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>الطيور</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>الارانب والهامستر</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={4} xs={6}>
                  <div className="footer-item">
                    <h4> الحساب والمستخدم</h4>
                    <ul>
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
                      <li>
                        <Link href={"/"}>
                          <a>حسابي</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a>طلباتي</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/"}>
                          <a> قائمة الرغبات</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Alifi. جميع الحقوق محفوظة.</p>
        </div>
      </Container>
    </div>
  );
};

export default Index;
