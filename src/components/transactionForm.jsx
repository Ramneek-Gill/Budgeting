import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getTransaction,
  saveTransaction
} from "../services/transactionService";
import { getCategories } from "../services/categoryService";

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

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    const transactionId = this.props.match.params.id;
    if (transactionId === "new") return;

    try {
      const { data: transaction } = await getTransaction(transactionId);
      this.setState({ data: this.mapToViewModel(transaction) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
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
