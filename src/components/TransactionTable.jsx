import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class TransactionTable extends Component {
  columns = [
    {
      path: "item",
      label: "Item",
      content: transaction => (
        <Link to={`/transactions/${transaction._id}`}>{transaction.item}</Link>
      )
    },
    { path: "category.name", label: "Category" },
    { path: "cost", label: "Cost" },

    {
      key: "delete",
      content: transaction => (
        <button
          onClick={() => this.props.onDelete(transaction)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { transactions, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={transactions}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TransactionTable;
