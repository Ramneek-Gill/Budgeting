import React, { Component } from "react";
// import BudgetNumber from "./common/budgetNumber";
import { getTransactions } from "../services/transactionService";
import { getCategories } from "../services/fakeCategoryService";
import { exportDefaultSpecifier } from "@babel/types";

class Budget extends Component {
  state = {
    value1: 0,
    value2: 0,
    value3: 0
  };

  async componentDidMount() {
    const getTrans = await getTransactions();
    console.log(getTrans.data[1]);

    const foodVal = this.totalCosts(getTrans, "Food");
    const entertainmentVal = this.totalCosts(getTrans, "Entertainment");
    const utilitiesVal = this.totalCosts(getTrans, "Utilities");

    this.setState({ foodVal, entertainmentVal, utilitiesVal });
  }
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
        sum += transactions[num].cost;
        if (cat === "Food") {
          console.log("transaction: ", transactions[num].cost);
          console.log("sum so far: ", sum);
        }
      }
    }

    // if (cat === "Food") {
    //   this.setState({ foodVal: sum });
    // } else if (cat === "Entertainment") {
    //   this.setState({ entertainmentVal: sum });
    // } else if (cat === "Utilities") {
    //   this.setState({ utilitiesVal: sum });
    // }
    return sum;
  };

  remainingBudget(budget, cost) {
    return budget - cost;
  }

  render() {
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
            <td>${this.state.foodVal}</td>
            <td>
              ${this.remainingBudget(this.state.value1, this.state.foodVal)}
            </td>
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
            <td>
              <input
                type="number"
                value={this.state.value3}
                onChange={this.handleChange3}
              />
            </td>
            <td>${this.state.utilitiesVal}</td>
            <td>
              $
              {this.remainingBudget(this.state.value3, this.state.utilitiesVal)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Budget;
