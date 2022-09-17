const db = require("./db/connection")

module.exports.insertUser = ( reqBody ) => {
    const {email, firstName, lastName, hashedPassword} = reqBody
    const userDetails = [firstName, lastName, email, hashedPassword]  
    return db.query(`INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)`, userDetails).then((res) => {
        return res.rows
    })
}