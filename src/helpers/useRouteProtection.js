import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export const useRouteProtection = (protectionType) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const cookies = parseCookies();
    const token = cookies.token;

    if (protectionType === "auth-only") {
      // Redirect to home if user is logged in (login and register pages)
      if (token) {
        router.push("/");
      }
    } else if (protectionType === "protected") {
      // Redirect to login if user is not logged in (profile and verify pages)
      if (!token) {
        router.push("/login");
      }
    }
  }, [router.isReady, protectionType]);
};
