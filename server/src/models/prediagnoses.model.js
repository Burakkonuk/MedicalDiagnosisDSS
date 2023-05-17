const mongoose = require("mongoose");

const prediagnosesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "prediagnoses",
    timestamps: true,
  }
);

const Prediagnoses = mongoose.model("prediagnoses", prediagnosesSchema);

module.exports = Prediagnoses;
