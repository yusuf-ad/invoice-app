const { Invoice } = require("../models/invoiceModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    results: user.invoices.length,
    data: {
      invoices: user.invoices,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const { invoices: userInvoices } = await User.findById(req.user.id);

  const [invoice] = userInvoices.filter(
    (invoice) => invoice.invoiceId === req.params.id
  );

  if (!invoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      invoice,
    },
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const paymentTerms = req.body.paymentTerms.split(" ").at(1);

  const invoiceTemplate = {
    paymentDue: req.body.paymentDue,
    description: req.body.description,
    paymentTerms,
    status: req.body.status,
    clientName: req.body.clientName,
    clientEmail: req.body.clientEmail,
    senderAddress: req.body.senderAddress,
    clientAddress: req.body.clientAddress,
    items: req.body.items,
    total: req.body.total,
  };

  const newInvoice = await Invoice.create({ ...invoiceTemplate });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { invoices: newInvoice } },
    { new: true }
  );

  if (!user) {
    return next(new AppError("This user doesn't exist.", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      invoice: newInvoice,
    },
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.invoices = user.invoices.filter(
    (invoice) => invoice.invoiceId !== req.params.id
  );

  await user.save();

  res.status(204).json({
    status: "success",
  });
});
