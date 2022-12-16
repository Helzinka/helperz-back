const express = require("express")
const router = express.Router()
const User = require("../models/users")
const { checkBody } = require("../modules/checkBody")
const uid2 = require("uid2")
const bcrypt = require("bcrypt")

router.post("/signup", (req, res) => {
	if (!checkBody(req.body, ["username", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}

	User.findOne({ username: req.body.username }).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10)
			const token = uid2(32)
			const newUser = new User({
				username: req.body.username,
				password: hash,
				token: token,
			})

			newUser.save().then(() => {
				res.json({ result: true, token: token })
			})
		} else {
			res.json({ result: false, error: "User already exists" })
		}
	})
})

router.post("/signin", (req, res) => {
	if (!checkBody(req.body, ["username", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}

	User.findOne({ username: req.body.username }).then((data) => {
		console.log(data)
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({ result: true, token: data.token })
		} else {
			res.json({ result: false, error: "User not found" })
		}
	})
})

module.exports = router
