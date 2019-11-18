import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class SubscriptionTable extends Component {
  columns = [
    {
      path: "item",
      label: "Item",
      content: subscription => (
        <Link to={`/subscriptions/${subscription._id}`}>
          {subscription.item}
        </Link>
      )
    },
    { path: "cost", label: "Cost" },

    { path: "duration", label: "Duration" },
    { path: "dateOfPayment", label: "Last Payment Date" },
    { path: "nextPayment", label: "Next Payment Date" },

    {
      key: "delete",
      content: subscription => (
        <button
          onClick={() => this.props.onDelete(subscription)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { subscriptions, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={subscriptions}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SubscriptionTable;
