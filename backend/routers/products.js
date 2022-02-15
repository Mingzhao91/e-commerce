const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    req.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post("/", async (req, res) => {
  let product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product = await product.save();

  if (!product) {
    res.status(404).send("the product cannot be created!");
  }

  res.send(product);
});

module.exports = router;
