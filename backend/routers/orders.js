const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderList);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Order Id");
  }

  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    res.status(500).json({ message: "Order with the given ID was not found." });
  }

  res.status(200).send(order);
});

router.post("/", async (req, res) => {
  const orderItemsIds = await Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const totalPricesArray = await Promise.all(
    orderItemsIds.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPricesArray.reduce(
    (prevTotalPrices, currItemPrice) => prevTotalPrices + currItemPrice,
    0
  );

  let order = new Order({
    orderItems: orderItemsIds,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    res.status(400).send("Order cannot be created!");
  }

  res.status(200).send(order);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Order Id");
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!order) {
    res.status(400).send("Order cannot be updated!");
  }

  res.status(200).send(order);
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Order Id");
    }

    const order = await Order.findByIdAndRemove(req.params.id);

    if (order) {
      await order.orderItems.map(async (orderItemId) => {
        await OrderItem.findByIdAndRemove(orderItemId);
      });

      res.status(200).json({ success: true, message: "Order is deleted." });
    } else {
      res.status(404).json({ success: false, message: "Order is not found." });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    res.status(400).send("The order sales cannot be generated.");
  }

  res.send({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (orderCount) {
      return res.status(200).json({ orderCount });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.get("/get/userorders/:userid", async (req, res) => {
  const userOrderList = await Order.find({
    user: req.params.userid,
  })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(userOrderList);
});

module.exports = router;
