const { Invoice } = require("../models/invoiceModel");
const User = require("../models/userModel");
const generateId = require("generate-unique-id");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    results: user.invoices.length,
    data: {
      invoices: user.invoices,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const { invoices: userInvoices } = req.user;

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
  // Net 7 days -> 7
  const paymentTerms = req.body.paymentTerms.split(" ").at(1);

  const invoiceTemplate = {
    invoiceId: generateId({
      length: 6,
      useLetters: true,
    }).toUpperCase(),
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

exports.updateInvoice = catchAsync(async (req, res, next) => {
  const invoiceId = req.params.id;
  const user = req.user;

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

  const updatedInvoice = await Invoice.findOneAndUpdate(
    {
      invoiceId,
    },
    invoiceTemplate,
    { new: true }
  );

  user.invoices = user.invoices.map((invoice) =>
    invoice.invoiceId === invoiceId ? updatedInvoice : invoice
  );

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      invoice: updatedInvoice,
    },
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const user = req.user;

  user.invoices = user.invoices.filter(
    (invoice) => invoice.invoiceId !== req.params.id
  );

  await user.save();

  res.status(204).json({
    status: "success",
  });
});

exports.deleteAllInvoices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.invoices = [];

  await user.save();

  res.status(204).json({
    status: "success",
  });
});

exports.updateInvoiceStatus = catchAsync(async (req, res, next) => {
  const user = req.user;

  let updatedInvoice;
  user.invoices = user.invoices.map((invoice) => {
    if (invoice.invoiceId === req.params.id) {
      updatedInvoice = { ...invoice, status: "paid" };
      return updatedInvoice;
    }
    return invoice;
  });

  await user.save();

  res.status(200).json({
    status: "success",
    invoice: updatedInvoice,
  });
});
