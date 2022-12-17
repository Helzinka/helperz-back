require("dotenv").config()
require("./models/connection")

// libs pour faire fonctionnner l'environement
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")

// noms routers
const indexRouter = require("./routes/index")
const announcesRouter = require("./routes/announces")
const usersRouter = require("./routes/users")
const commentsRouter = require("./routes/comments")

// initialisation de express
const app = express()

// dependances de express
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// chemins des routers principaux
app.use("/comments", commentsRouter)
app.use("/announces", announcesRouter)
app.use("/users", usersRouter)

module.exports = app
