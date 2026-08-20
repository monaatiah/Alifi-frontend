import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export const useRouteProtection = (protectionType) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const cookies = parseCookies();
    const token = cookies.token;

    if (protectionType === "auth-only") {
      // Logged-in users should not open auth pages.
      if (token) {
        router.replace("/");
      }
    } else if (protectionType === "protected") {
      // Guests should be redirected to login before protected pages.
      if (!token) {
        const currentPath = router.asPath || "/";
        const loginPath = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
        router.replace(loginPath);
      }
    }
  }, [protectionType, router]);
};
