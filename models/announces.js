const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	title: String,
	url: String,
	price: Number,
	description: String,
	tag: [String],
	userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
})

const announces = mongoose.model("announces", userSchema)

module.exports = announces
