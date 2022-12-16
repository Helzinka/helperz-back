const express = require("express")
const router = express.Router()
const Announces = require("../models/announces")

// POST ANNOUNCES/
router.post("/", function (req, res) {
	Announces.create({
		title: req.body.title,
		url: req.body.url,
		price: req.body.price,
		description: req.body.description,
		userOwner: req.body.userOwner,
		tag: req.body.tag,
	}).then((data) => {
		res.json(data)
	})
})

// suprimmer des champs
// router.post("/:id", (req, res) => {
// 	Announces.updateOne(
// 		{
// 			_id: req.params.id,
// 		},
// 		{
// 			$unset: { title: "", url: "" },
// 		}
// 	).then((data) => {
// 		res.json(data)
// 	})
// })

module.exports = router
