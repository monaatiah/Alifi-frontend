import React, { useState } from "react";
import Image from "next/future/image";
import Link from "next/link";

import styles from "./styles/style.module.scss";

import PhoneIcon from "./assets/images/mobile.svg";
import EmailIcon from "./assets/images/email.svg";
import UserIcon from "./assets/images/user.svg";
import SearchIcon from "./assets/images/search.svg";
import HeartIcon from "./assets/images/heart.svg";
import CartIcon from "./assets/images/cart.svg";
import MenuIcon from "./assets/images/menu.svg";
import HomeIcon from "./assets/images/home.svg";

import FacebookIcon from "./assets/images/facebook.svg";
import TwitterIcon from "./assets/images/twitter.svg";
import GoogleIcon from "./assets/images/google.svg";
import InstagramIcon from "./assets/images/instagram.svg";

import LogoIcon from "./assets/images/logo.png";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

const Index = () => {
  const { asPath } = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <header
        className={`${styles.header} position-absolute w-100 start-0 z-2`}
      >
        <Container>
          <div className="top-bar d-flex align-items-center gap-3 justify-content-between py-3">
            <div className="d-flex align-items-center gap-5">
              <Link href={`tel:123456789`}>
                <a className="d-flex align-items-center gap-2 text-white">
                  <PhoneIcon fill="#fff" />
                  123-456-789
                </a>
              </Link>
              <Link href={`mailto:info@alifi.sa`}>
                <a className="d-flex align-items-center gap-2 text-white">
                  <EmailIcon fill="#fff" />
                  info@alifi.sa
                </a>
              </Link>
            </div>
            <Link href={"/login"}>
              <a className="d-flex align-items-center gap-2 text-white">
                <UserIcon fill="#fff" />
                تسجيل الدخول / إنشاء حساب
              </a>
            </Link>
          </div>
          <div className="bottom-bar d-flex align-items-center gap-4 justify-content-between bg-white">
            <button
              type="button"
              className="menu-btn d-lg-none d-md-block border-0 bg-transparent"
              onClick={() => setShowSidebar(true)}
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
            <div className="logo">
              <Link href={"/"}>
                <a>
                  <Image src={LogoIcon} alt="Logo" width={107} height={76} />
                </a>
              </Link>
            </div>
            <div className="menu flex-grow-1">
              <ul className="d-flex align-items-center gap-4 justify-content-center">
                <li>
                  <Link href={"/"}>
                    <a
                      className={
                        asPath === "/"
                          ? "d-flex align-items-center gap-2 active"
                          : "d-flex align-items-center gap-2"
                      }
                    >
                      <HomeIcon width={20} height={20} />
                      الرئيسية
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <a className={asPath === "/about" ? "active" : ""}>
                      معلومات عنا
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <a className={asPath.includes("services") ? "active" : ""}>
                      خدماتنا
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <a className={asPath === "/store" ? "active" : ""}>
                      متجرنا
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <a className={asPath.includes("blogs") ? "active" : ""}>
                      اخر الاخبار
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/"}>
                    <a className={asPath === "/contact" ? "active" : ""}>
                      تواصل معنا
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="actions d-flex align-items-center gap-2">
              <button
                className="search-btn border-0 bg-transparent"
                type="button"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              <button
                className="wishlist-btn border-0 bg-transparent"
                type="button"
                aria-label="Wishlist"
              >
                <HeartIcon />
              </button>
              <button
                className="cart-btn border-0 position-relative"
                type="button"
                aria-label="Cart"
              >
                <CartIcon />
                <i className="item-count d-flex align-items-center justify-content-center position-absolute">
                  0
                </i>
              </button>
            </div>
          </div>
        </Container>

        <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      </header>
    </>
  );
};

export default Index;
