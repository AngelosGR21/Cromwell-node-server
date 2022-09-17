const http = require("http")
const server = http.createServer()

const {postUser, loginUser} = require("./controllers")
const endRequest = require("./utils/endRequest")

server.on("request", async (req, res) => {
    if(req.url === "/" && req.method === "GET"){
        endRequest(res, 200, "Api is up and running")
    }else if(req.url === "/user/register" && req.method === "POST"){
        postUser(req, res)
    }else if(req.url === "/user/login" && req.method === "POST"){
        loginUser(req, res)
    }
})


module.exports = server