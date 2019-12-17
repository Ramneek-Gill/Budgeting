import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/budgets";
const corsHeader = "https://cors-anywhere.herokuapp.com/";

export async function saveBudget(budget) {
  const copy = await http.get(corsHeader + apiEndpoint);
  console.log(copy.data[0]);
  console.log(budget.categoryId);
  //   if (copy.data.length > 0 && copy.data[0].name === name) {
  //     const body = { ...budget };
  //     delete body._id;
  //     body.name = name;
  //     return http.put(corsHeader + apiEndpoint + "/" + copy.data[0]._id, body);
  //   }

  for (var num in copy.data) {
    if (copy.data[num].category._id === budget.categoryId) {
      const body = { ...budget };
      delete body._id;
      return http.put(
        corsHeader + apiEndpoint + "/" + copy.data[num]._id,
        body
      );
    }
  }

  return http.post(corsHeader + apiEndpoint, budget);
}

export function getBudgets() {
  return http.get(corsHeader + apiEndpoint);
}
