const http = require("http")
const catNames = require("cat-names")

const server = http.createServer((request, response) => {
	console.log(request.url)

	if (request.url === "/") {
		response.write("<h1>This is the homepage</h1>")
		response.end()
	} else if (request.url === "/about") {
		response.write("about page")
		response.end()
	} else {
		response.write(`404, ${catNames.random()}`)
		response.end()
	}
})

server.listen(3000)
