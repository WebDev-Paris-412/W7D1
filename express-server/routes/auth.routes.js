const router = require("express").Router()

router.get("/signup", (req, res) => {
	res.json({ message: "You're logged in!" })
})

module.exports = router
