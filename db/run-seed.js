const db = require("./connection")
const seed = require("./seed")

const runSeed = () => {
    return seed().then(() => db.end());
}


runSeed();