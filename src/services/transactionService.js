import http from "./httpService";

const apiEndpoint = "http://stormy-meadow-32596.herokuapp.com/api/transactions";

export function getTransactions() {
  return http.get(apiEndpoint);
}

export function deleteTransaction(transactionId) {
  return http.delete(apiEndpoint + "/" + transactionId);
}
