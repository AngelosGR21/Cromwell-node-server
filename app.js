const http = require("http")
const server = http.createServer()

const {postUser} = require("./controllers")
const endRequest = require("./utils/endRequest")

server.on("request", async (req, res) => {
    if(req.url === "/" && req.method === "GET"){
        endRequest(res, 200, "Api is up and running")
    }else if(req.url === "/user/register" && req.method === "POST"){
        postUser(req, res)
    }
})


module.exports = server