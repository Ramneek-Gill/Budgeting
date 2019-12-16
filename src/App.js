import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Transactions from "./components/transactions";
import TransactionForm from "./components/transactionForm";
import SubscriptionForm from "./components/subscriptionForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Budget from "./components/budget";
import Logout from "./components/common/logout";
import Subscriptions from "./components/subscriptions";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/transactions/:id" component={TransactionForm} />
            {/* <Route path="/subscriptions/:id" component={SubscriptionForm} /> */}
            <Route path="/transactions" component={Transactions} />
            <Route path="/budget" component={Budget} />
            {/* <Route path="/subscriptions" component={Subscriptions} /> */}
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/transactions" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
