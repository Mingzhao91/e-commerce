const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const productList = await Product.find().populate("category");

  if (!productList) {
    req.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) {
    res.status(500).send("The product cannot be created!");
  }

  res.send(product);
});

router.get(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    res.status(500).send("The product cannot be updated!");
  }

  res.send(product);
});

router.delete(`/:id`, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product Id");
    }
    const product = await Product.findByIdAndRemove(req.params.id);

    if (product) {
      res.status(200).json({ success: true, message: "Product is deleted." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product is not found." });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
