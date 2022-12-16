const mongoose = require("mongoose")

// .env DB_STRING
const connectionString = process.env.DB_STRING

mongoose
	.set("strictQuery", false)
	.connect(connectionString, { connectTimeoutMS: 2000 })
	.then(() => console.log("Database connected"))
	.catch((error) => console.error(error))
