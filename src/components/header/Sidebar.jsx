import React from "react";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";

import CloseIcon from "./assets/images/x.svg";
import PhoneIcon from "./assets/images/mobile.svg";
import EmailIcon from "./assets/images/email.svg";
import UserIcon from "./assets/images/user.svg";
import { useSelector } from "react-redux";

const Sidebar = ({ show, onClose }) => {
  const { asPath } = useRouter();

  const { settings } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

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
        <Image src={settings?.logo || ""} alt="Logo" width={107} height={76} />
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
        <Link href={`tel:${settings?.contact_phone?.split("/")[4]}`}>
          <a className="d-flex align-items-center gap-2">
            <PhoneIcon fill="#7267c3" />
            {settings?.contact_phone?.split("/")[4]}
          </a>
        </Link>
        <Link href={`mailto:${settings?.contact_email?.split("/")[4]}`}>
          <a className="d-flex align-items-center gap-2">
            <EmailIcon fill="#7267c3" />
            {settings?.contact_email?.split("/")[4]}
          </a>
        </Link>
      </div>
      {user ? (
        <Link href={"/profile"}>
          <a className="btn mt-4 w-100">
            <UserIcon fill="#000" />
            حسابي
          </a>
        </Link>
      ) : (
        <Link href={"/login"}>
          <a className="btn mt-4 w-100">
            <UserIcon fill="#000" />
            تسجيل الدخول / إنشاء حساب
          </a>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
