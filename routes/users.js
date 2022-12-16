const express = require("express")
const router = express.Router()
const User = require("../models/users")
const { checkBody } = require("../modules/checkBody")
const uid2 = require("uid2")
const bcrypt = require("bcrypt")

// POST /USER/SIGNUP
// inscription d'un utilisateur
// champs : username + password
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

			newUser.save().then((data) => {
				res.json({ result: true, user: data })
			})
		} else {
			res.json({ result: false, error: "User already exists" })
		}
	})
})

// POST /USER/SIGNIN
// connection d'un utilisateur
// champs : username + password
router.post("/signin", (req, res) => {
	if (!checkBody(req.body, ["username", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}

	User.findOne({ username: req.body.username }).then((data) => {
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({ result: true, token: data })
		} else {
			res.json({ result: false, error: "User not found" })
		}
	})
})

// UPDATE /USER/HELPERZ/:ID
// router.update("/helperz/:token", (req, res) => {
// 	User.updateOne(
// 		{
// 			token: req.params.token,
// 		},
// 		{
// 			$set: {
// 				...(req.body.username && { username: req.body.username }),
// 			},
// 		}
// 	)
// })

module.exports = router
