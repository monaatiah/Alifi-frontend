import axios from "axios";

import { parseCookies } from "nookies";

const server = () => {
  const headers = {};
  let lang = "ar";

  if (typeof window !== "undefined") {
    const cookies = parseCookies();
    lang = cookies.lang || "ar";
  }

  headers["Content-Language"] = lang;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
  });

  return axiosInstance;
};

export default server;
