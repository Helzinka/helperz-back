const mongoose = require("mongoose")

// sous-document position
const Position = mongoose.Schema({
	name: String,
	lat: Number,
	long: Number,
})

// sous-document helperz
const Helperz = mongoose.Schema({
	isHelperz: Boolean,
	available: Boolean,
	skills: [String],
	review: Number,
	location: Position,
})

// Model user
// clef-etrangere vers collection "announces"
// user a plusieurs annonces
const userSchema = mongoose.Schema(
	{
		username: String,
		lastname: String,
		password: String,
		email: String,
		avatar: String,
		// description: String,
		helperz: Helperz,
		token: String,
		announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "announces" }],
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const User = mongoose.model("users", userSchema)

module.exports = User
