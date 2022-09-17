const server = require("./app")
const hostname = "localhost"
const port = 5000

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})