const mongoose = require("mongoose")

// sous-document position
const Position = mongoose.Schema({
	name: String,
	lat: Number,
	long: Number,
})

const announcesSchema = mongoose.Schema(
	{
		title: String,
		url: String,
		price: Number,
		description: String,
		location: Position,
		tag: [String],
		userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
	},
	{ versionKey: false }
)

const announces = mongoose.model("announces", announcesSchema)

module.exports = announces
