const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    message: String,
    upVote: Number,
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false, timestamps: true }
);

const comments = mongoose.model("comments", commentsSchema);

module.exports = comments;
