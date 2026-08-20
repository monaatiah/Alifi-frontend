import React from "react";
import Image from "next/image";
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
            <Link href={"/"} className={asPath === "/" ? "active" : ""}>
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href={"/"} className={asPath === "/about" ? "active" : ""}>
              معلومات عنا
            </Link>
          </li>
          <li>
            <Link href={"/"} className={asPath.includes("services") ? "active" : ""}>
              
                خدماتنا
              
            </Link>
          </li>
          <li>
            <Link href={"/"} className={asPath === "/store" ? "active" : ""}>
              متجرنا
            </Link>
          </li>
          <li>
            <Link href={"/"} className={asPath.includes("blogs") ? "active" : ""}>
              
                اخر الاخبار
              
            </Link>
          </li>
          <li>
            <Link href={"/"} className={asPath === "/contact" ? "active" : ""}>
              
                تواصل معنا
              
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer d-flex flex-column gap-3 border-top py-3 border-bottom">
        <Link
          href={`tel:${settings?.contact_phone?.split("/")[4]}`}
          className="d-flex align-items-center gap-2">

          <PhoneIcon fill="#7267c3" />
          {settings?.contact_phone?.split("/")[4]}

        </Link>
        <Link
          href={`mailto:${settings?.contact_email?.split("/")[4]}`}
          className="d-flex align-items-center gap-2">

          <EmailIcon fill="#7267c3" />
          {settings?.contact_email?.split("/")[4]}

        </Link>
      </div>
      {user ? (
        <Link href={"/profile"} className="btn mt-4 w-100">

          <UserIcon fill="#000" />حسابي
                    
        </Link>
      ) : (
        <Link href={"/login"} className="btn mt-4 w-100">

          <UserIcon fill="#000" />تسجيل الدخول / إنشاء حساب
                    
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
