const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	token: String,
})

const user = mongoose.model("user", userSchema)

module.exports = user
