const express = require("express")
const router = express.Router()
const Comments = require("../models/comments")
const Announces = require("../models/announces")

// ajoute une annonce a un user
function addCommentToAnnounce(announceId, commentId) {
	Announces.updateOne(
		{
			_id: announceId,
		},
		{
			$push: {
				comments: commentId,
			},
		}
	).then((data) => {
		data ? true : false
	})
}

// POST ANNOUNCES/
// creation annonces
router.post("/:announceId", (req, res) => {
	Comments.create({
		message: req.body.message,
		upVote: req.body.upVote,
		userOwner: req.body.userOwner,
	}).then((data) => {
		if (data) {
			addCommentToAnnounce(req.params.announceId, data._id)
			res.json({ resutl: true, data: data })
		} else {
			res.json({ result: false, error: "Can't add comments" })
		}
	})
})

// PUT ANNOUNCES/:ID
// modifie des champs d'un commentaire
router.put("/:id", (req, res) => {
	Comments.updateOne(
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
// supprime un commentaire
router.delete("/:id", (req, res) => {
	Announces.deleteOne({ _id: req.params.id }).then((data) => {
		res.json({ resutl: true, data: data })
	})
})

module.exports = router
