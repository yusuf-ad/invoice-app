const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  const authHeader = req.headers["authorization"];

  // 1) Getting token and check if it's exist
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ").at(1);
  }

  if (!token)
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! PLease log in to get access..",
    });

  // 2) Payload'daki idle kullanıcıyı bul
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.userId);

  // 3) Check if user still exist
  if (!currentUser)
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token doesn't exist!",
    });

  req.user = currentUser;

  next();
});
