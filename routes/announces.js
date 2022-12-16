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
		tag: [req.body.tag],
	}).then((data) => {
		res.json("Create announces", `${data.title}`)
	})
})

module.exports = router
