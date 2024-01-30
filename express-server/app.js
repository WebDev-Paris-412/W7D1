/**
 * Once everything is intsalled,
 * require express.
 */
const express = require("express")

/**
 * express if a function giving back an Object
 * We typically call this object 'app'
 */

const app = express()
/**
 * Import middlewares
 */
const helmet = require("helmet")
const morgan = require("morgan")

/**
 * Middlewares 😱
 * A middleware is a function that is used during the lifetime of the request:
 * The lifetime of the request is:
 * - We receive the request
 * - LIFETIME ♥️
 * - We send back a response
 */

//! Protection using helmet
app.use(helmet())

//! Logging with morgan
app.use(morgan("dev"))

//! Serving static files
app.use(express.static("public"))

//! Parse json in the request sent by the client.
app.use(express.json())

//! Parse FormData sent by the client.
app.use(express.urlencoded({ extended: true }))

/**
 * Every request goes into this middleware
 */
app.use((req, res, next) => {
	req.secret = "My-Api-Key"
	req.isLoggedIn = true
	// console.log("in the middleware")
	next()
})

/**
 * Here we can create some routes
 * we are redirecting every request to the index.routes
 */

const indexRouting = require("./routes/index.routes")

app.use("/", indexRouting)

/**
 * 404 should be one
 */
app.all("*", (req, res) => {
	res.status(404).send("Woopsies, that is a 404.")
})
/**
 * app.listen is typically done last
 */
app.listen(5005, () => {
	console.log(`Server is 🏃 on http://localhost:5005`)
})
