const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = isValid ? null : new Error("invalid image type");
    cb(uploadError, `./public/uploads`);
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    req.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }
  if (!req.file) {
    res.status(400).send("No image is provided");
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
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

router.put(`/:id`, uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }

  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).send("Invalid Product");
  }

  const file = req.file;
  let imagePath = "";

  if (file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagePath,
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

  if (!updatedProduct) {
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

router.get(`/get/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (productCount) {
      return res.status(200).json({ productCount });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.get(`/get/featured/:count`, async (req, res) => {
  try {
    const count = +req.params.count || 0;
    const products = await Product.find({
      isFeatured: true,
    })
      .limit(count)
      .exec();

    console.log("products: ", products);

    if (products) {
      return res.status(200).json({ products });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product Id");
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product) {
      res.status(500).send("The product cannot be updated!");
    }

    res.send(product);
  }
);
module.exports = router;
