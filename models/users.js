const mongoose = require("mongoose")

// sous-document position
const Position = mongoose.Schema({
	name: String,
	lat: Number,
	long: Number,
})

// sous-document helperz
const Helper = mongoose.Schema({
	isHelper: Boolean,
	available: Boolean,
	skills: [String],
	review: Number,
	location: Position,
})

// Model user
// clef-etrangere vers collection "announces"
// user a plusieurs annonces
const userSchema = mongoose.Schema({
	username: String,
	lastname: String,
	password: String,
	email: String,
	helper: Helper,
	token: String,
	announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "announces" }],
})

const User = mongoose.model("users", userSchema)

module.exports = User
