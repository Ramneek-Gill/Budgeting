import http from "./httpService";

export function getCategories() {
  return http.get("http://stormy-meadow-32596.herokuapp.com/api/categories");
}
