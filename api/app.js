const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");

// isteklerdeki JSON verilerini işlemek için kullanılır.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/invoices", invoiceRouter);

// Handling unhandled routes
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // const err = new Error("Bu route tanımlanmadı! 💩");
  // err.status = "fail";
  // err.statusCode = 404;

  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

// ! Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
