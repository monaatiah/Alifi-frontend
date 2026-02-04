import server from "./server";
import { setCookie } from "nookies";

export const authApi = async ({ cookies, type, data }) => {
  const response = await server({ cookies }).post(
    `/customers/actions/${type}`,
    data,
  );

  // Add token to cookies on successful login
  if (type === "login" && response?.data?.token) {
    setCookie(null, "token", response.data.token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  }

  // add token to cookies on successful register
  if (type === "register" && response?.data?.token) {
    setCookie(null, "token", response.data.token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  }

  return response;
};

export const fetchUserApi = async (cookies) => {
  const response = await server({ cookies }).post(
    "/customers/actions/get-user",
  );
  return response;
};
