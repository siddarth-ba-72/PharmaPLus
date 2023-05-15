const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const errorMiddleWare = require("./middleware/errorMiddleWare.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const medicineRouter = require("./routers/medicineRouter.js");
const authRouter = require("./routers/authRouter.js");
const invoiceRouter = require("./routers/invoiceRouter.js");

const { isAuthenticated } = require("./middleware/authentication.js");

app.use("/medapi", isAuthenticated, medicineRouter);
app.use("/authapi", authRouter);
app.use("/invoiceapi", invoiceRouter);

// ! Middleware for error handlers
app.use(errorMiddleWare);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = app;
