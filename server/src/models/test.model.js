const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
        type: Number,
        required: true,
    },
    testGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "testGroup",
        required: true,
    } 
  },
  {
    collection: "test",
    timestamps: true,
  }
);

const Test = mongoose.model("test", testSchema);

module.exports = Test;
