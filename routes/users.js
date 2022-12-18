const express = require("express")
const router = express.Router()
const User = require("../models/users")
const { checkBody } = require("../modules/checkBody")
const uid2 = require("uid2")
const bcrypt = require("bcrypt")

// POST /USER/SIGNUP
// inscription d'un utilisateur
router.post("/signup", (req, res) => {
	// champ requis "username", "password" , "email" + "lastname"
	if (!checkBody(req.body, ["username", "email", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}

	User.findOne({ email: req.body.email }).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10)
			const token = uid2(32)

			User.create({
				username: req.body.username,
				email: req.body.email,
				password: hash,
				token: token,
			}).then((data) => {
				if (data) {
					res.json({
						result: true,
						user: {
							token: data.token,
							username: data.username,
						},
					})
				} else {
					res.json({ result: false, error: "Can't save user" })
				}
			})
		} else {
			res.json({ result: false, error: "User already exists" })
		}
	})
})

// POST /USER/SIGNIN
// connection d'un utilisateur
router.post("/signin", (req, res) => {
	// champ requis "email", "password"
	if (!checkBody(req.body, ["email", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}
	// cherche un email en bdd
	User.findOne({ email: req.body.email }).then((data) => {
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({
				result: true,
				user: { token: data.token, username: data.username },
			})
		} else {
			res.json({ result: false, error: "User not found" })
		}
	})
})

// GET /USER/:ID
// recupère toute les infos d'un user sauf password
router.get("/:token", (req, res) => {
	User.findOne({ token: req.params.token }, { password: 0 })
		.populate("announces")
		.then((data) => {
			if (data) {
				res.json({ result: true, user: data })
			} else {
				res.json({ result: false, error: "Can't get user" })
			}
		})
})

// PUT /USER/:ID
// update le document avec les champs spécifiés
router.put("/:token", (req, res) => {
	User.updateOne(
		{
			token: req.params.token,
		},
		{
			$set: req.body,
		}
	).then((data) => {
		if (data) {
			res.json({ result: true, user: data })
		}
	})
})

module.exports = router
