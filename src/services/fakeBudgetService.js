import * as categoriesAPI from "./fakeCategoryService";

const budgets = [];

export function getBudgets() {
  return budgets;
}

export function getBudget(id) {
  return budgets.find(t => t._id === id);
}

export function saveBudget(budget) {
  let budgetInDb = budgets.find(t => t._id === budget._id) || {};
  budgetInDb.item = budget.item;
  budgetInDb.category = categoriesAPI.categories.find(
    c => c._id === budget.categoryId
  );
  budgetInDb.cost = budget.cost;

  if (!budgetInDb._id) {
    budgetInDb._id = Date.now().toString();
    budgets.push(budgetInDb);
  }

  return budgetInDb;
}

export function deleteBudget(id) {
  let budgetInDb = budgets.find(t => t._id === id);
  budgets.splice(budgets.indexOf(budgetInDb), 1);
  return budgetInDb;
}
