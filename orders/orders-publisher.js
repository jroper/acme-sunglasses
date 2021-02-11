const cloudstate = require("cloudstate");

const action = new cloudstate.Action(
    "orders-publisher.proto",
    "com.acme.sunglasses.orders.OrdersPublisher",
);

// This is a streamed out action command handler.
action.commandHandlers.HandleOrderEvent = function(event, ctx) {
  if (event.type === "OrderAdded") {
    orderAdded(event, ctx);
  } else {
    // Unknown event type, ignore.
    ctx.end();
  }
};

function orderAdded(added, ctx) {

  // While not strictly needed, the subject of this message that we're publishing is the order id, so let's set
  // that metadata. The proxy will fill in whatever CloudEvent metadata we don't set for us.
  const metadata = new cloudstate.Metadata();
  metadata.cloudevent.subject = added.order.orderID;

  // We're publishing a protobuf Order message, but it just so happens that the format of the JSON that we store
  // matches it perfectly, so we don't have to do anything, otherwise we'd have to create a new object and copy the
  // fields across.
  ctx.write(added.order, metadata);
  ctx.end();
}

module.exports = action;