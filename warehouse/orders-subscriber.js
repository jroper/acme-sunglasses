const cloudstate = require("cloudstate");

const action = new cloudstate.Action(
    "orders-subscriber.proto",
    "com.acme.sunglasses.warehouse.OrdersSubscriber",
);

const inventoryService = action.root.lookupService("com.acme.sunglasses.warehouse.Inventory");
const updateStockMethod = inventoryService.methods.UpdateStock;

// This is a streamed out action command handler.
action.commandHandlers.HandleOrder = function(order, ctx) {
  order.items.forEach(item => {
    ctx.thenForward(updateStockMethod, {
      id: item.productID,
      stock: item.quantity
    });
  });
  ctx.end();
};

module.exports = action;