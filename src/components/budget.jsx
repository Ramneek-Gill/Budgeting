import React, { Component } from "react";
// import BudgetNumber from "./common/budgetNumber";
import { getTransactions } from "../services/transactionService";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveBudget, getBudgets } from "../services/budgetService";
import { getCategories } from "../services/categoryService";
import { exportDefaultSpecifier } from "@babel/types";
import httpService from "../services/httpService";

class Budget extends Form {
  state = {
    data: {
      budget: "",
      categoryId: ""
    },
    categories: [],
    errors: {},

    value1: 0,
    value2: 0,
    value3: 0
  };
  schema = {
    _id: Joi.string(),
    budget: Joi.number()
      .required()
      .min(0)
      .max(999999)
      .label("Budget"),
    categoryId: Joi.string()
      .required()
      .label("Category")
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    const getTrans = await getTransactions();

    const foodVal = this.totalCosts(getTrans, "Food");
    const entertainmentVal = this.totalCosts(getTrans, "Entertainment");
    const utilitiesVal = this.totalCosts(getTrans, "Utilities");

    this.setState({ foodVal, entertainmentVal, utilitiesVal });

    const value1 = await this.getBudgetNumbers("Food");
    const value2 = await this.getBudgetNumbers("Entertainment");
    const value3 = await this.getBudgetNumbers("Utilities");

    this.setState({ value1, value2, value3 });
  }
  async getBudgetNumbers(cat) {
    const budgets = await getBudgets();
    for (var num in budgets.data) {
      if (budgets.data[num].category.name === cat) {
        return budgets.data[num].budget;
      }
    }
  }
  doSubmit = async () => {
    await saveBudget(this.state.data);
    window.location.reload();
  };

  totalCosts = (transactions, cat) => {
    let sum = 0;
    for (var num in transactions.data) {
      if (transactions.data[num].category.name === cat) {
        sum += transactions.data[num].cost;
      }
    }
    return sum;
  };

  remainingBudget(budget, cost) {
    return budget - cost;
  }

  render() {
    return (
      <React.Fragment>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Budget</th>
              <th scope="col">Total Costs</th>
              <th scope="col">Remaining Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Food</th>
              <td>${this.state.value1}</td>
              <td>${this.state.foodVal}</td>
              <td>
                ${this.remainingBudget(this.state.value1, this.state.foodVal)}
              </td>
            </tr>
            <tr>
              <th scope="row">Entertainment</th>
              <td>${this.state.value2}</td>
              <td>${this.state.entertainmentVal}</td>
              <td>
                $
                {this.remainingBudget(
                  this.state.value2,
                  this.state.entertainmentVal
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Utilities</th>
              <td>${this.state.value3}</td>
              <td>${this.state.utilitiesVal}</td>
              <td>
                $
                {this.remainingBudget(
                  this.state.value3,
                  this.state.utilitiesVal
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginBottom: "200px" }}></div>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("budget", "Budget", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default Budget;
