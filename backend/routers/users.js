const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    passwordHash: bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.BCRYPT_SALT)
    ),
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
      newPasswordHash = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.BCRYPT_SALT)
      );
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

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  const secret = process.env.JWT_SECRET;
  if (!user) {
    res.status(400).send("User not found!");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({ user: user.email, token });
  } else {
    res.status(400).send("password is wrong!");
  }
});

module.exports = router;
