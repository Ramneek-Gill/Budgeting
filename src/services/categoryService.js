import http from "./httpService";
import { apiUrl } from "../config.json";

const corsHeader = "https://cors-anywhere.herokuapp.com/";

export function getCategories() {
  return http.get(corsHeader + apiUrl + "/categories");
}
