const express = require("express");

const invoiceController = require("../controllers/invoiceController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, invoiceController.getAllInvoices)
  .post(authController.protect, invoiceController.createInvoice);

router
  .route("/:id")
  .get(authController.protect, invoiceController.getInvoice)
  .delete(authController.protect, invoiceController.deleteInvoice);

module.exports = router;
