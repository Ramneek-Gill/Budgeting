import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubscriptionTable from "./subscriptionTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import {
  getSubscriptions,
  deleteSubscription
} from "../services/fakeSubscriptionService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Subscriptions extends Component {
  state = {
    subscriptions: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "item", order: "asc" }
  };

  componentDidMount() {
    this.setState({ subscriptions: getSubscriptions() });
  }

  handleDelete = subscription => {
    const subscriptions = this.state.subscriptions.filter(
      m => m._id !== subscription._id
    );
    this.setState({ subscriptions });

    deleteSubscription(subscription._id);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      subscriptions: allSubscriptions
    } = this.state;

    let filtered = allSubscriptions;
    if (searchQuery)
      filtered = allSubscriptions.filter(m =>
        m.item.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedCategory && selectedCategory._id)
    //   filtered = allSubscriptions.filter(
    //     m => m.category._id === selectedCategory._id
    //   );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const subscriptions = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: subscriptions };
  };

  render() {
    const { length: count } = this.state.subscriptions;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no subscriptions in the database.</p>;

    const { totalCount, data: subscriptions } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Link
              to="/subscriptions/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Subscription
            </Link>
            <p>Showing {totalCount} subscriptions in the database.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <SubscriptionTable
              subscriptions={subscriptions}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Subscriptions;
