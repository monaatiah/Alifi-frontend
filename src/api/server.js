import axios from "axios";

import { parseCookies } from "nookies";

const server = () => {
  const headers = {};
  let lang = "ar";
  let token = null;

  if (typeof window !== "undefined") {
    const cookies = parseCookies();
    lang = cookies.lang || "ar";
    token = cookies.token;
  }

  headers["Content-Language"] = lang;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
  });

  return axiosInstance;
};

export default server;
