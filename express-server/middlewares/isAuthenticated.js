function isAuthenticated(req, res, next) {
	if (req.isLoggedIn) {
		return next()
	} else {
		return res.json({ message: "You're not logged in." })
	}
}

module.exports = isAuthenticated
