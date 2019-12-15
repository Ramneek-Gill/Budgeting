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
  const anid = transaction._id;
  if (transaction._id) {
    const body = Object.assign({}, transaction);
    delete body._id;
    return http.put(apiEndpoint + "/" + anid, body);
  }
  return http.post(apiEndpoint, transaction);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
