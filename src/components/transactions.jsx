import React, { Component } from "react";
import { Link } from "react-router-dom";
import TransactionTable from "./TransactionTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import {
  getTransactions,
  deleteTransaction
} from "../services/fakeTransactionService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Transactions extends Component {
  state = {
    transactions: [],
    categories: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "item", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [{ _id: "", name: "All Categories" }, ...data];

    this.setState({ transactions: getTransactions(), categories });
  }

  handleDelete = transaction => {
    const transactions = this.state.transactions.filter(
      m => m._id !== transaction._id
    );
    this.setState({ transactions });

    deleteTransaction(transaction._id);
  };

  // handleLike = transaction => {
  //   const transactions = [...this.state.transactions];
  //   const index = transactions.indexOf(transaction);
  //   transactions[index] = { ...transactions[index] };
  //   transactions[index].liked = !transactions[index].liked;
  //   this.setState({ transactions });
  // };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = category => {
    console.log(`selected category: ${category.name}`);
    this.setState({
      selectedCategory: category,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedCategory: null,
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
      selectedCategory,
      searchQuery,
      transactions: allTransactions
    } = this.state;

    let filtered = allTransactions;
    if (searchQuery)
      filtered = allTransactions.filter(m =>
        m.item.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory._id)
      filtered = allTransactions.filter(
        m => m.category._id === selectedCategory._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const transactions = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: transactions };
  };

  render() {
    const { length: count } = this.state.transactions;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no transactions in the database.</p>;

    const { totalCount, data: transactions } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          <Link
            to="/transactions/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Transaction
          </Link>
          <p>Showing {totalCount} transactions in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <TransactionTable
            transactions={transactions}
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
    );
  }
}

export default Transactions;
