import axios from "axios";

const ENV = import.meta.env.MODE;
const URL =
  ENV === "development" ? "http://localhost:5000" : import.meta.env.VITE_URL_API;

export const urlApi = axios.create({
  baseURL: URL,
});
