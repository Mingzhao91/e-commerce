const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "Category with the given ID was not found." });
  }

  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) {
    res.status(400).send("User cannot be created!");
  }

  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPasswordHash;

  if (userExist) {
    if (req.body.password) {
      newPasswordHash = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPasswordHash = userExist.passwordHash;
    }
  } else {
    res.status(400).send("User cannot be updated!");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPasswordHash,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
    },
    {
      new: true,
    }
  );

  if (!user) {
    res.status(400).send("User cannot be updated!");
  }

  res.status(200).send(user);
});

module.exports = router;
