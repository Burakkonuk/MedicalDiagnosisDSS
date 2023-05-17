const mongoose = require("mongoose");

const strategySchema = new mongoose.Schema(
  {
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    prediagnosesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prediagnoses",
        required: true,
    }
  },
  {
    collection: "strategy",
    timestamps: true,
  }
);

const Strategy = mongoose.model("strategy", strategySchema);

module.exports = Strategy;
