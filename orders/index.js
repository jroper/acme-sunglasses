const CloudState = require("cloudstate").CloudState;
const orders = require("./orders.js");
const ordersPublisher = require("./orders-publisher");

const cloudstate = new CloudState();
cloudstate.addEntity(orders);
cloudstate.addEntity(ordersPublisher);
cloudstate.start();
