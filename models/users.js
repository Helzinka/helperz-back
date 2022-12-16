const mongoose = require("mongoose")
const Announces = require("./announces")

const latLong = mongoose.Schema({
	lat: Number,
	long: Number,
})

const userSchema = mongoose.Schema({
	username: String,
	lastname: String,
	password: String,
	email: String,
	isHelper: Boolean,
	available: Boolean,
	review: Number,
	location: latLong,
	skills: [String],
	token: String,
	annonces: [{ type: mongoose.Schema.Types.ObjectId, ref: Announces }],
})

const User = mongoose.model("users", userSchema)

module.exports = User
