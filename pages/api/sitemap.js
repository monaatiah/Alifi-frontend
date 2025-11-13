import axios from "axios";

export default async function handler(req, res) {
  try {
    const sitemap = await axios.get("https://alifi.sa/sitemap.xml");

    res.send(sitemap?.data);
  } catch (error) {
    //// console.log(error);
    res.send("");
  }
}
