import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  try {
    const { data } = await axios.get(`${API_URL}/settings`);
    res.status(200).send(data?.data?.robots || "");
  } catch (error) {
    console.error("robots.txt fetch failed:", error?.message);
    res.status(200).send("");
  }
}
