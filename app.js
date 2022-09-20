const http = require("http")
const server = http.createServer()

const {postUser, loginUser, getUser} = require("./controllers")
const endRequest = require("./utils/endRequest")

server.on("request", async (req, res) => {
    if(req.method === "OPTIONS"){
        res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	    res.setHeader('Access-Control-Allow-Headers', 'content-type');
        res.statusCode = 204
        res.end();
        return
    }

    if(req.url === "/" && req.method === "GET"){
        endRequest(res, 200, "Api is up and running")
    }else if(req.url === "/user/register" && req.method === "POST"){
        postUser(req, res)
    }else if(req.url === "/user/login" && req.method === "POST"){
        loginUser(req, res)
    }else if(req.url === "/user" && req.method === "GET"){
        getUser(req, res)
    }
})


module.exports = server