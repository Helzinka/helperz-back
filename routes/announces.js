const express = require("express")
const router = express.Router()
const Announces = require("../models/announces")
const User = require("../models/users")

// ajoute une annonce a un user
function addAnnouncesToUser(userId, announceId) {
	User.updateOne(
		{
			_id: userId,
		},
		{
			$push: {
				annonces: announceId,
			},
		}
	).then((data) => {
		data ? true : false
	})
}

// POST ANNOUNCES/
router.post("/", (req, res) => {
	Announces.create({
		title: req.body.title,
		url: req.body.url,
		price: req.body.price,
		description: req.body.description,
		userOwner: req.body.userOwner,
		tag: req.body.tag,
	}).then((data) => {
		if (data) {
			addAnnouncesToUser(data.userOwner, data._id)
			res.json({ result: true })
		} else {
			res.json({ result: false, error: "Can't add announces" })
		}
	})
})

// POST ANNOUNCES/ par tag et lieu
// retourne toute les announces avec le lieu et les tags
router.post("/", (req, res) => {
	Announces.find({
		$and: [{ tag: { $in: req.body.tag } }, { "location.name": req.body.name }],
	}).then((data) => {
		res.json(data)
	})
})

// PUT ANNOUNCES/:ID
// modifie des champs d'une annonce
router.put("/:id", (req, res) => {
	Announces.updateOne(
		{
			_id: req.params.id,
		},
		{
			$set: req.body,
		}
	).then((data) => {
		if (data) {
			res.json({ result: true })
		}
	})
})

module.exports = router
