import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transactions";

export function getTransactions() {
  return http.get(apiEndpoint);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
