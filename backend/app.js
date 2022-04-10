const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
// HTTP request logger middleware for node.js
app.use(morgan("tiny"));
// Validate JWT. User needs to provide validate token in order to visit routes
app.use(authJwt());
// Make public/uploads path static
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// Handle errors
app.use(errorHandler);

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
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    // console.log("database connection is ready");
  })
  .catch((err) => {
    console.log("err: ", err);
  });

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log("server is running http://localhost:3000");
});
