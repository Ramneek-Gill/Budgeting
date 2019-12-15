import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transactions";
const corsHeader = "https://cors-anywhere.herokuapp.com/";

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
    return http.put(corsHeader + apiEndpoint + "/" + transaction._id, body);
  }
  console.log(transaction);
  return http.post(corsHeader + apiEndpoint, transaction);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
