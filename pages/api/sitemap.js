import axios from "axios";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL;

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");

  try {
    const { data } = await axios.get(`${MAIN_URL}/sitemap.xml`);
    res.status(200).send(data);
  } catch (error) {
    console.error("sitemap.xml fetch failed:", error?.message);
    res.status(200).send("");
  }
}
