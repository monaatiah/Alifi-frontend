import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { Toaster } from "react-hot-toast";
import TopBarProgress from "react-topbar-progress-indicator";
import SSRProvider from "react-bootstrap/SSRProvider";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "aos/dist/aos.css";
import "swiper/css";
import "../styles/main.scss";

const languages = {
  ar: require("@/content/languages/ar.json"),
  en: require("@/content/languages/en.json"),
};

import { wrapper } from "../src/store";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale, defaultLocale } = useRouter();
  const activeLocale = locale || defaultLocale || "ar";
  const messages = languages[activeLocale] || languages.ar;
  const dir = activeLocale === "ar" ? "rtl" : "ltr";

  const [Progress, setProgress] = useState(false);

  TopBarProgress.config({
    barThickness: 3,
    barColors: {
      0: "#fff",
      0.5: "#000",
      1.0: "#000",
    },
  });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(true);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(false);
    });
    router.events.on("routeChangeError");
  }, [router]);

  useEffect(() => {
    (async () => {
      const AOS = await import("aos"); // استيراد ديناميكي داخل الـ client فقط
      AOS.init({
        once: true,
        disable: "mobile",
      });
    })();

    document.documentElement.dir = dir;
    document.body.style.direction = dir;
    document.body.setAttribute("dir", dir);
  }, [dir]);

  return (
    <>
      <Head>
        <title>Alifi</title>
        <link rel="shortcut icon" href={"/favicon.png"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Alifi Website" />
      </Head>
      {Progress && <TopBarProgress />}
      <IntlProvider
        messages={messages}
        defaultLocale={defaultLocale || "ar"}
        locale={activeLocale}
      >
        <SSRProvider>
          <div className="wrap">
            <Component {...pageProps} />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  direction: dir,
                },
              }}
            />
          </div>
        </SSRProvider>
      </IntlProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
