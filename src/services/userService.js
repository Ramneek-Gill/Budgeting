import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";
const corsHeader = "https://cors-anywhere.herokuapp.com/";

export function register(user) {
  return http.post(corsHeader + apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
