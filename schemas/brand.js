const mongoose = require("mongoose");

var brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

brandSchema.virtual("published", {
  ref: "phone",
  localField: "_id",
  foreignField: "brand",
});
brandSchema.set("toObject", { virtuals: true });
brandSchema.set("toJSON", { virtuals: true });
module.exports = new mongoose.model("brand", brandSchema);
