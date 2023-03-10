const express = require("express")
const router = express.Router()
const Announces = require("../models/announces")
const User = require("../models/users")

// ajoute une annonce a un user
function addAnnounceToUser(userId, announceId) {
	User.updateOne(
		{
			_id: userId,
		},
		{
			$push: {
				announces: announceId,
			},
		}
	).then((data) => {
		data ? true : false
	})
}

// POST ANNOUNCES/
// creation annonces
router.post("/", (req, res) => {
	Announces.create({
		title: req.body.title,
		url: req.body.url,
		price: req.body.price,
		description: req.body.description,
		userOwner: req.body.userOwner,
		tag: req.body.tag,
		"location.name": req.body.name,
		"location.lat": req.body.lat,
		"location.long": req.body.long,
	}).then((data) => {
		if (data) {
			addAnnounceToUser(data.userOwner, data._id)
			res.json({ result: true, announces: data })
		} else {
			res.json({ result: false, error: "Can't add announces" })
		}
	})
})

// GET ANNOUNCES/:location
// retourne toute les announces
router.get("/", (req, res) => {
	Announces.find()
		.populate("userOwner")
		.populate({
			path: "comments",
			populate: {
				path: "userOwner",
			},
		})
		.then((data) => {
			res.json({ result: true, data: data })
		})
})

// GET ANNOUNCES/:location
// retourne une announce selon son id
router.get("/id/:id", (req, res) => {
	Announces.findOne({ _id: req.params.id })
		.populate("userOwner")
		.populate({
			path: "comments",
			populate: {
				path: "userOwner",
			},
		})
		.then((data) => {
			res.json({ result: true, data: data })
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
			res.json({ result: true, data: data })
		}
	})
})

// DELETE ANNOUNCES/:ID
// supprime une annonce
router.delete("/:id", (req, res) => {
	Announces.deleteOne({ _id: req.params.id }).then((data) => {
		res.json({ result: true, data: data })
	})
})

module.exports = router
