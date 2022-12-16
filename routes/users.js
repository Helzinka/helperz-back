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
	if (!checkBody(req.body, ["username", "email", "password", "lastname"])) {
		res.json({ result: false, error: "Missing or empty fields" })
		return
	}

	User.findOne({ email: req.body.email }).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10)
			const token = uid2(32)

			User.create({
				username: req.body.username,
				lastname: req.body.lastname,
				email: req.body.email,
				password: hash,
				token: token,
			}).then((err, data) => {
				if (data) {
					res.json({
						result: true,
						user: {
							token: data.token,
							username: data.username,
							id: data._id,
						},
					})
				} else {
					res.json({ result: false, err: err, error: "Can't save user" })
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
	User.findOne({ email: req.body.email }).then((err, data) => {
		if (data && bcrypt.compareSync(req.body.password, data.password)) {
			res.json({
				result: true,
				user: { token: data.token, username: data.username, id: data._id },
			})
		} else {
			res.json({ result: false, error: "User not found", err: err })
		}
	})
})

// PUT /USER/:TOKEN
// ajoute une annonce a un utilisateur
router.put("/:id", (req, res) => {
	User.updateOne(
		{
			_id: req.params.id,
		},
		{
			$push: {
				annonces: req.body.annonces,
			},
		}
	).then((err, data) => {
		if (data) {
			res.json({ result: true })
		} else {
			res.json({ result: false, err: err })
		}
	})
})

// GET /USER/:ID
// recupère toute les infos d'un user sauf password
router.get("/:id", (req, res) => {
	User.findOne({ _id: req.params.id }, { password: 0 })
		.populate("announces")
		.then((data) => {
			if (data) {
				res.json({ result: true, user: data })
			} else {
				res.json({ result: false, err: err })
			}
		})
})

module.exports = router
