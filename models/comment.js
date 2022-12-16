const mongoose = require("mongoose")
const Users = require("./users")

const userSchema = mongoose.Schema({
	message: String,
	upVote: Number,
	userOwner: { type: mongoose.Schema.Types.ObjectId, ref: Users },
})

const User = mongoose.model("comments", userSchema)

module.exports = User
