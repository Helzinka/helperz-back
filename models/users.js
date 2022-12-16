const mongoose = require("mongoose")

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
})

const User = mongoose.model("users", userSchema)

module.exports = User
