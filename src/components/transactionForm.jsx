import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getTransaction,
  saveTransaction
} from "../services/fakeTransactionService";
import { getCategories } from "../services/fakeCategoryService";

class TransactionForm extends Form {
  state = {
    data: {
      item: "",
      categoryId: "",
      cost: ""
    },
    categories: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    item: Joi.string()
      .required()
      .label("Item"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    cost: Joi.number()
      .required()
      .min(0)
      .max(999999)
      .label("Cost")
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });

    const transactionId = this.props.match.params.id;
    if (transactionId === "new") return;

    const transaction = getTransaction(transactionId);
    if (!transaction) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(transaction) });
  }

  mapToViewModel(transaction) {
    return {
      _id: transaction._id,
      item: transaction.item,
      categoryId: transaction.category._id,
      cost: transaction.cost
    };
  }

  doSubmit = () => {
    saveTransaction(this.state.data);

    this.props.history.push("/transactions");
  };

  render() {
    return (
      <div>
        <h1>Transaction Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("item", "Item")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("cost", "Cost", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TransactionForm;
