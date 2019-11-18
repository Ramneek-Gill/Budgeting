import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getSubscription,
  saveSubscription
} from "../services/fakeSubscriptionService";
import { getDurations } from "../services/fakeDurations";

class SubscriptionForm extends Form {
  state = {
    data: {
      item: "",
      durationId: "",
      cost: ""
      // duration: ""
    },
    durations: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    item: Joi.string()
      .required()
      .label("Item"),
    durationId: Joi.string()
      .required()
      .label("Duration"),
    cost: Joi.number()
      .required()
      .min(0)
      .max(999999)
      .label("Cost")
    // duration: Joi.number()
    //   .required()
    //   .min(0)
    //   .max(365)
    //   .label("Duration (# of days)")
  };

  componentDidMount() {
    const durations = getDurations();
    this.setState({ durations });

    const subscriptionId = this.props.match.params.id;
    if (subscriptionId === "new") return;

    const subscription = getSubscription(subscriptionId);
    if (!subscription) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(subscription) });
  }

  mapToViewModel(subscription) {
    return {
      _id: subscription._id,
      item: subscription.item,
      durationId: subscription.duration._id,
      cost: subscription.cost
      // duration: subscription.duration,
      // dateOfPayment: subscription.dateOfPayment
      // // nextPayment: subscription.nextPayment
    };
  }

  doSubmit = () => {
    saveSubscription(this.state.data);

    this.props.history.push("/subscriptions");
  };

  render() {
    return (
      <div>
        <h1>Subscription Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("item", "Item")}
          {this.renderSelect("durationId", "Duration", this.state.durations)}
          {this.renderInput("cost", "Cost", "number")}
          {/* {this.renderInput("duration", "Duration (# of days)", "number")} */}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
