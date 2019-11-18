const subscriptions = [
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    item: "Netflix",
    cost: 9.99,
    duration: 30,
    dateOfPayment: "",
    nextPayment: ""
  }
];

export function getSubscriptions() {
  return subscriptions;
}

export function getSubscription(id) {
  return subscriptions.find(t => t._id === id);
}

export function saveSubscription(subscription) {
  let subscriptionInDb =
    subscriptions.find(t => t._id === subscription._id) || {};
  subscriptionInDb.item = subscription.item;
  subscriptionInDb.cost = subscription.cost;
  subscriptionInDb.duration = subscription.duration;
  subscriptionInDb.dateOfPayment = subscription.dateOfPayment;

  if (!subscriptionInDb._id) {
    subscriptionInDb._id = Date.now().toString();
    subscriptions.push(subscriptionInDb);
  }

  return subscriptionInDb;
}

export function deleteSubscription(id) {
  let subscriptionInDb = subscriptions.find(t => t._id === id);
  subscriptions.splice(subscriptions.indexOf(subscriptionInDb), 1);
  return subscriptionInDb;
}
