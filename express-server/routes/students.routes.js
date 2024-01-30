const router = require("express").Router()
const students = require("./../students.json")

/**
 * ! All routes are prefixed with /students
 */
function logger(req, res, next) {
	console.table({ originalUrl: req.originalUrl, params: req.params })
	next()
}
router.get("/", logger, logger, logger, (req, res) => {
	return res.json({ count: students.length, result: students, greet: "Howdy" })
})

/**
 * params anyone?
 * Same as in React, define them using :nameOfYourParams
 * Acces them using req.params.nameOfYourParams
 */
router.get("/:index", (req, res) => {
	const oneStudent = students[req.params.index]
	res.json({ foundStudent: oneStudent })
})

module.exports = router
