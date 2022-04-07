const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Category Id");
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res
      .status(500)
      .json({ message: "Category with the given ID was not found." });
  }

  return res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) {
    return res.status(400).send("Category cannot be created!");
  }

  return res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Category Id");
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) {
    return res.status(400).send("Category cannot be updated!");
  }

  return res.status(200).send(category);
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Category Id");
    }
    const category = await Category.findByIdAndRemove(req.params.id);

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: "Category is deleted." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category is not found." });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

module.exports = router;
