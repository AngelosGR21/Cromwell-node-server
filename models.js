const db = require("./db/connection")
const bcrypt = require("bcrypt")

module.exports.insertUser = ( reqBody ) => {
    const {email, firstName, lastName, hashedPassword} = reqBody
    const userDetails = [firstName, lastName, email, hashedPassword]  
    return db.query(`INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)`, userDetails).then((res) => {
        return res.rows
    })
}

module.exports.verifyUser = ( reqBody ) => {
    const {email, password} = reqBody

    return db.query(`SELECT * FROM users 
    WHERE email = $1`, [email]).then( (res) => {
        const user = res.rows[0];
        return bcrypt.compare(password, user.password).then((correct) => {
            if(!correct) return Promise.reject({statusCode: 401, message: "Invalid email or password", customError: true})
            delete user.password;

            return user;
        })
    })

}