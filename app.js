const http = require("http")
const server = http.createServer()

server.on("request", async (req, res) => {
    if(req.url === "/" && req.method === "GET"){
        endRequest(res, 200, "Api is up and running")
    }
})


function endRequest (res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({data}))
}



module.exports = server