const mongoose = require("mongoose");

var phoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    year: Number,
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("phone", phoneSchema);
