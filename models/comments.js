const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	message: String,
	upVote: Number,
	userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
})

const comments = mongoose.model("comments", userSchema)

module.exports = comments
