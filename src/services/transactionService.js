import http from "./httpService";
import { apiUrl } from "../config.json";
import { isMobileDevice } from "react-select/src/utils";

const apiEndpoint = apiUrl + "/transactions";

export function getTransactions() {
  return http.get(apiEndpoint);
}

export function getTransaction(transactionId) {
  return http.get(apiEndpoint + "/" + transactionId);
}

export function saveTransaction(transaction) {
  //   if (transaction._id) {
  //     const body = {...transaction};
  //     delete body._id;
  //     return http.put(apiEndpoint + "/" + transaction._id, body);
  //   }
  //   return http.post(apiEndpoint, transaction);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
