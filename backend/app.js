const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
// HTTP request logger middleware for node.js
app.use(morgan("tiny"));

// Routes
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("database connection is ready");
  })
  .catch((err) => {
    console.log("err: ", err);
  });

// Server
app.listen(3000, () => {
  console.log("api: ", api);
  console.log("server is running http://localhost:3000");
});
