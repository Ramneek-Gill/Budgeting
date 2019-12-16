import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const corsHeader = "https://cors-anywhere.herokuapp.com/";

export function login(email, password) {
  return http.post(corsHeader + apiEndpoint, { email, password });
}
