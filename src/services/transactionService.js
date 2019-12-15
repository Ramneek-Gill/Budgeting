import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transactions";

export function getTransactions() {
  return http.get(apiEndpoint);
}

export function getTransaction(transactionId) {
  return http.get(apiEndpoint + "/" + transactionId);
}

export function saveTransaction(transaction) {
  if (transaction._id) {
    const body = { ...transaction };
    delete body._id;
    console.log(body);
    return http.put(apiEndpoint + "/" + transaction._id, body);
  }
  console.log(transaction);
  return http.post(apiEndpoint, transaction);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
