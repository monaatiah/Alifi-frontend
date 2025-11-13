import axios from "axios";

export default async function handler(req, res) {
  try {
    const res = await axios.get(`https://alifi.sa/api/settings`);

    res.send(res?.data?.data?.settings?.robots);
  } catch (error) {
    //// console.log(error);
    res.send("");
  }
}
