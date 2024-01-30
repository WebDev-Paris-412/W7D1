const router = require("express").Router()
const catNames = require("cat-names")
const isAuthenticated = require("./../middlewares/isAuthenticated")

router.use("/auth", require("./auth.routes"))

router.use(isAuthenticated)

router.use("/students", require("./students.routes"))

router.get("/home", (request, response) => {
	// response.send("hello")
	// console.log(__dirname)
	response.send("test")
	// response.sendFile(__dirname + "/../views/home.html")
})

/**
 * req.secret was defined
 * in a middleware earlier, have a look at line 35!
 */
router.get("/admin", (req, res) => {
	res.json({ secret: req.secret })
})

function randomCatController(req, res) {
	res.json({ name: catNames.random() })
}
router.get("/cat-random", randomCatController)

router.get("/", (req, res) => {
	res.json({ message: `You succesfully made a request` })
})

module.exports = router
