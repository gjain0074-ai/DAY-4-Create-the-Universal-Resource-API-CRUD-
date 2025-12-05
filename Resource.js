const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    status: { type: String, default: "pending" },
    amount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // link to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", ResourceSchema);
