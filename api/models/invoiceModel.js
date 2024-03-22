const mongoose = require("mongoose");
const { Schema } = mongoose;

const generateId = require("generate-unique-id");
const date = require("date-and-time");

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  { _id: false }
);

const invoiceSchema = new Schema(
  {
    paymentDue: {
      type: String,
    },
    description: {
      type: String,
      default: "Invoice description",
    },
    paymentTerms: String,
    status: {
      type: String,
      default: "pending",
      lowercase: true,
    },
    senderAddress: {
      type: addressSchema,
      required: [true, "Please enter the sender address. 1"],
    },
    clientName: {
      type: String,
      required: [true, "Please enter the client's name."],
    },
    clientEmail: {
      type: String,
      required: [true, "Please enter the client's email."],
    },
    clientAddress: {
      type: addressSchema,
      required: [true, "Please enter the sender address. 2"],
    },
    // ! array of objects
    items: {
      type: [Object],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    invoiceId: String,
  },
  { timestamps: true }
);

invoiceSchema.pre("save", function (next) {
  this.invoiceId = generateId({
    length: 6,
    useLetters: true,
  }).toUpperCase();

  next();
});

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = { Invoice, invoiceSchema };
