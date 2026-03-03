const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    storedName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shareToken: {
      type: String,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
    },
    maxViews: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);