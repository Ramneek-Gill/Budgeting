import React, { Component } from "react";
// import BudgetNumber from "./common/budgetNumber";
import { getTransactions } from "../services/fakeTransactionService";
import { getCategories } from "../services/fakeCategoryService";

class Budget extends Component {
  state = {
    value1: 0,
    value2: 0,
    value3: 0
  };

  handleChange1 = event => {
    this.setState({
      value1: event.target.value
    });
  };
  handleChange2 = event => {
    this.setState({
      value2: event.target.value
    });
  };
  handleChange3 = event => {
    this.setState({
      value3: event.target.value
    });
  };

  totalCosts = (transactions, cat) => {
    let sum = 0;
    for (var num in transactions) {
      if (transactions[num].category.name === cat) {
        console.log(transactions[num].category.name);
        sum += transactions[num].cost;
      }
    }
    return sum;
  };

  remainingBudget(budget, cost) {
    return budget - cost;
  }

  render() {
    const getTrans = getTransactions();
    const cate = getCategories();
    let cat1 = this.totalCosts(getTrans, cate[0].name);
    console.log(cat1);
    let cat2 = this.totalCosts(getTrans, cate[1].name);
    console.log(cat2);

    const foodVal = this.totalCosts(getTrans, "Food");
    const entertainmentVal = this.totalCosts(getTrans, "Entertainment");
    const utilitiesVal = this.totalCosts(getTrans, "Utilities");

    return (
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
            <td>
              <input
                type="number"
                value={this.state.value1}
                onChange={this.handleChange1}
              />
            </td>
            <td>${foodVal}</td>
            <td>${this.remainingBudget(this.state.value1, foodVal)}</td>
          </tr>
          <tr>
            <th scope="row">Entertainment</th>
            <td>
              <input
                type="number"
                value={this.state.value2}
                onChange={this.handleChange2}
              />
            </td>
            <td>${entertainmentVal}</td>
            <td>
              ${this.remainingBudget(this.state.value2, entertainmentVal)}
            </td>
          </tr>
          <tr>
            <th scope="row">Utilities</th>
            <td>
              <input
                type="number"
                value={this.state.value3}
                onChange={this.handleChange3}
              />
            </td>
            <td>${utilitiesVal}</td>
            <td>${this.remainingBudget(this.state.value3, utilitiesVal)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Budget;
