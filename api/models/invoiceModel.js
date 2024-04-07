const mongoose = require("mongoose");
const { Schema } = mongoose;

const generateId = require("generate-unique-id");

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
    invoiceId: String,
    description: {
      type: String,
      default: "Invoice description",
    },
    status: {
      type: String,
      default: "pending",
      lowercase: true,
    },
    paymentDue: {
      type: String,
    },
    paymentTerms: String,
    total: {
      type: Number,
      default: 0,
    },
    items: {
      type: [Object],
      default: [],
    },
    senderAddress: {
      type: addressSchema,
    },
    clientName: {
      type: String,
    },
    clientEmail: {
      type: String,
    },
    clientAddress: {
      type: addressSchema,
    },
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
