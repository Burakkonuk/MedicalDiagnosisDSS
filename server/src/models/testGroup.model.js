const mongoose = require("mongoose");

const testGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "testGroup",
    timestamps: true,
  }
);

const TestGroup = mongoose.model("testGroup", testGroupSchema);

module.exports = TestGroup;
