import * as categoriesAPI from "./fakeCategoryService";

const transactions = [
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    item: "Groceries",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 70
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    item: "Video Game",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Entertainment" },
    cost: 80
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    item: "Starbucks",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 6
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718179",
    item: "Poker",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Entertainment" },
    cost: 15
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718180",
    item: "Boston Pizza",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 32
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718181",
    item: "Hockey Game",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Entertainment" },
    cost: 50
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718182",
    item: "Sports Bar",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 18
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718183",
    item: "Online Game Subscription",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Entertainment" },
    cost: 15
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718184",
    item: "Mcdonalds",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 8
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718185",
    item: "Pizza Hut",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 32
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718186",
    item: "Starbucks",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 8
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718187",
    item: "KFC",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 14
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718188",
    item: "Groceries",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 15
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718189",
    item: "Taco Bell",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 12
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718190",
    item: "Fruit",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 20
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718191",
    item: "Veggies",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Food" },
    cost: 14
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718192",
    item: "Electricity",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" },
    cost: 150
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718193",
    item: "Water",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" },
    cost: 230
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718194",
    item: "Internet",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" },
    cost: 50
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718195",
    item: "CableTV",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" },
    cost: 50
  },
  {
    _id: "5b21ca3eeb7f6fbccd4718196",
    item: "Water",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Utilities" },
    cost: 210
  }
];

export function getTransactions() {
  return transactions;
}

export function getTransaction(id) {
  return transactions.find(t => t._id === id);
}

export function saveTransaction(transaction) {
  let transactionInDb = transactions.find(t => t._id === transaction._id) || {};
  transactionInDb.item = transaction.item;
  transactionInDb.category = categoriesAPI.categories.find(
    c => c._id === transaction.categoryId
  );
  transactionInDb.cost = transaction.cost;

  if (!transactionInDb._id) {
    transactionInDb._id = Date.now().toString();
    transactions.push(transactionInDb);
  }

  return transactionInDb;
}

export function deleteTransaction(id) {
  let transactionInDb = transactions.find(t => t._id === id);
  transactions.splice(transactions.indexOf(transactionInDb), 1);
  return transactionInDb;
}
