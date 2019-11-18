import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class BudgetTable extends Component {
  columns = [
    {
      path: "budget",
      label: "Budget"
    },
    {
      label: "Costs"
    },
    { path: "cost", label: "Remaining Budget" },

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

export default BudgetTable;
