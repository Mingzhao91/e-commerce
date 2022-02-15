const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("Category cannot be created!");
  }

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: "Category is deleted." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Category is not found." });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

module.exports = router;
