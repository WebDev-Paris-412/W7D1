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
const catNames = require("cat-names")
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
	// console.log("in the middleware")
	next()
})

const students = require("./students.json")
/**
 * Here we can create some routes
 */

app.get("/", (request, response) => {
	// response.send("hello")
	// console.log(__dirname)
	response.sendFile(__dirname + "/views/home.html")
})

app.get("/students", (req, res) => {
	res.json({ count: students.length, result: students, greet: "Howdy" })
})

/**
 * params anyone?
 * Same as in React, define them using :nameOfYourParams
 * Acces them using req.params.nameOfYourParams
 */

app.get("/students/:index", (req, res) => {
	const oneStudent = students[req.params.index]
	res.json({ foundStudent: oneStudent })
})

/**
 * req.secret was defined
 * in a middleware earlier, have a look at line 35!
 */
app.get("/admin", (req, res) => {
	res.json({ secret: req.secret })
})

function randomCatController(req, res) {
	res.json({ name: catNames.random() })
}
app.get("/cat-random", randomCatController)

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
