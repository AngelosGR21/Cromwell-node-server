const bcrypt = require("bcrypt");

const users = [
    {
        firstName: "Paul",
        lastName: "Statham",
        email: "paul@gmail.com",
        password: bcrypt.hashSync("PaulStatham55!", 10),
    },
    {
        firstName: "Alex",
        lastName: "Mele",
        email: "alex@gmail.com",
        password: bcrypt.hashSync("AlexMele55!", 10),
    },
    {
        firstName: "Lili",
        lastName: "Orinthia",
        email: "lili@gmail.com",
        password: bcrypt.hashSync("LiliOrinthia55!", 10),
    }
]

module.exports = users