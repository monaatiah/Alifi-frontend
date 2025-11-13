import React, { useState } from "react";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("react-bootstrap/Container"), {
  ssr: false,
});
import { FormattedMessage } from "react-intl";

import styles from "./styles/style.module.scss";
import { FaChevronLeft } from "react-icons/fa6";

import MenuIcon from "./assets/images/menu.svg";

import Sidebar from "./Sidebar";
import { handleImageLink } from "@/helpers/functions";

const Index = () => {
  const { pathname } = useRouter();

  const { settings } = useSelector((state) => state.settings);

  const [sidebarShown, setSidebarShown] = useState(false);

  return (
    <>
      <div className={styles["header-section"]}>
        <Container>
          <div className="menu">
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
          <div className="logo">
            <Link href="/">
              <a title="logo" aria-label="logo">
                <Image
                  src={handleImageLink(settings?.appLogo) || ""}
                  alt="logo"
                  width={300}
                  height={300}
                  quality={100}
                  title="logo"
                />
              </a>
            </Link>
          </div>
          <div className="actions">
            <Link href="/objections">
              <a
                className="btn"
                title="startObjection"
                aria-label="startObjection"
              >
                <FormattedMessage id="startObjection" />
                <FaChevronLeft />
              </a>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setSidebarShown(!sidebarShown)}
              aria-label="Toggle Menu"
              aria-labelledby="menu-toggle"
            >
              <MenuIcon fill="#000" />
            </button>
          </div>
        </Container>

        <Sidebar
          sidebarShown={sidebarShown}
          setSidebarShown={setSidebarShown}
        />

        <div
          className={
            sidebarShown ? "sidebar-overlay active" : "sidebar-overlay"
          }
          onClick={() => setSidebarShown(false)}
        ></div>
      </div>
    </>
  );
};

export default Index;
