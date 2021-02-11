const CloudState = require("cloudstate").CloudState;
const warehouse = require("./warehouse.js");
const ordersSubscriber = require("./orders-subscriber");

const cloudstate = new CloudState();
cloudstate.addEntity(warehouse);
cloudstate.addEntity(ordersSubscriber);
cloudstate.start();


