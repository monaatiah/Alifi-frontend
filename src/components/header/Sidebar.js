import React from "react";
import Image from "next/future/image";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

import CloseIcon from "./assets/images/x.svg";
import { handleImageLink } from "@/helpers/functions";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarShown, setSidebarShown }) => {
  const { pathname } = useRouter();

  const { settings } = useSelector((state) => state.settings);

  return (
    <div className={sidebarShown ? "sidebar active" : "sidebar"}>
      <div className="sidebar-header">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setSidebarShown(!sidebarShown)}
          aria-label="Toggle Menu"
          aria-labelledby="menu-toggle"
        >
          <CloseIcon fill="#000" />
        </button>
        <Image
          src={handleImageLink(settings?.appLogo) || ""}
          alt="logo"
          width={300}
          height={300}
          quality={100}
          title="logo"
        />
      </div>

      <div className="sidebar-menu">
        <ul>
          <li>
            <Link href="/">
              <a
                className={pathname === "/" ? "active" : ""}
                title="home"
                aria-label="home"
              >
                <FormattedMessage id="home" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/how-we-work">
              <a
                className={pathname === "/how-we-work" ? "active" : ""}
                title="howWeWork"
                aria-label="howWeWork"
              >
                <FormattedMessage id="howWeWork" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/faqs">
              <a
                className={pathname === "/faqs" ? "active" : ""}
                title="faqs"
                aria-label="faqs"
              >
                <FormattedMessage id="faqs" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a
                className={pathname === "/contact" ? "active" : ""}
                title="contact"
                aria-label="contact"
              >
                <FormattedMessage id="contact" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
