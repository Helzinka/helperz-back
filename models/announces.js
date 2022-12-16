const mongoose = require("mongoose")
const Users = require("./users")
const Comments = require("./comments")

const userSchema = mongoose.Schema({
	title: String,
	url: String,
	price: Number,
	description: String,
	tag: [String],
	userOwner: { type: mongoose.Schema.Types.ObjectId, ref: Users },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comments }],
})

const User = mongoose.model("announces", userSchema)

module.exports = User
