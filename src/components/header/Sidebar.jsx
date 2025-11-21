import React from "react";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";

import LogoIcon from "./assets/images/logo.png";

import CloseIcon from "./assets/images/x.svg";
import PhoneIcon from "./assets/images/mobile.svg";
import EmailIcon from "./assets/images/email.svg";
import UserIcon from "./assets/images/user.svg";

const Sidebar = ({ show, onClose }) => {
  const { asPath } = useRouter();

  return (
    <div className={show ? "sidebar active" : "sidebar"}>
      <div className="sidebar-header">
        <button
          type="button"
          className="menu-toggle"
          onClick={onClose}
          aria-label="Toggle Menu"
          aria-labelledby="menu-toggle"
        >
          <CloseIcon fill="#000" />
        </button>
      </div>

      <div className="sidebar-logo text-center mb-4">
        <Image src={LogoIcon} alt="Logo" width={107} height={76} />
      </div>

      <div className="sidebar-menu">
        <ul className="d-flex flex-column gap-3 mb-4">
          <li>
            <Link href={"/"}>
              <a className={asPath === "/" ? "active" : ""}>الرئيسية</a>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <a className={asPath === "/about" ? "active" : ""}>معلومات عنا</a>
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
              <a className={asPath === "/store" ? "active" : ""}>متجرنا</a>
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

      <div className="sidebar-footer d-flex flex-column gap-3 border-top py-3 border-bottom">
        <Link href={`tel:123456789`}>
          <a className="d-flex align-items-center gap-2">
            <PhoneIcon fill="#7267c3" />
            123-456-789
          </a>
        </Link>
        <Link href={`mailto:info@alifi.sa`}>
          <a className="d-flex align-items-center gap-2">
            <EmailIcon fill="#7267c3" />
            info@alifi.sa
          </a>
        </Link>
      </div>
      <Link href={"/login"}>
        <a className="btn mt-4 w-100">
          <UserIcon fill="#000" />
          تسجيل الدخول / إنشاء حساب
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
