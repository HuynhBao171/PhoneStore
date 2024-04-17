const mongoose = require("mongoose");

var orderSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    phone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "phone",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
