const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createToken = require("../utils/createToken");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User can not be found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const token = createToken(res, newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1. Check if username and password exist
  if (!username || !password) {
    return next(
      new AppError(`Please provide your username and password!`, 400)
    );
  }

  const user = await User.findOne({ username });

  // 2. Check if user exist & password is correct
  if (!user) {
    return next(
      new AppError("User not be found or you entered a wrong username!", 404)
    );
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("You entered wrong password!", 401));
  }

  // 3. Send token to client
  const token = createToken(res, user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "You are logged out!",
  });
});
