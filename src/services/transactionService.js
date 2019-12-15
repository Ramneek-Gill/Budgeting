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
  if (transaction._id) {
    const anid = transaction._id;
    // const body = Object.assign({}, transaction);
    delete transaction._id;
    return http.put(apiEndpoint + "/" + anid, transaction);
  }
  return http.post(apiEndpoint, transaction);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
