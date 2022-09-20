const parseData = require("./utils/parseData")
const bcrypt = require("bcrypt")
const endRequest = require("./utils/endRequest")
const jwt = require("jsonwebtoken")

const { insertUser, verifyUser } = require("./models");

module.exports.postUser = async (req, res) => {
    try{
        const {email, firstName, lastName, password} = await parseData(req)
        
        if(!email || !firstName || !lastName || !password) return endRequest(res, 400, "Bad request")

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/
        
        if(!email.match(emailRegex) || !password.match(passwordRegex)) return endRequest(res, 400, "Bad request")
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = await insertUser({email, firstName, lastName, hashedPassword})
           
        return jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "5h"}, (err, encoded) => {
            if(err) return endRequest(res, 500, "Internal server error")

            return endRequest(res, 200, "User has been created", encoded)
        })
    }catch(e){
        if(e.code === "23505") return endRequest(res, 409, "Email is already in use") 
        return endRequest(res, 500, "Internal server error")
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        const {email, password} = await parseData(req);
        
        if(!email || !password) return endRequest(res, 400, "Bad request")

        const userDetails = await verifyUser({email, password})

        return jwt.sign(userDetails, process.env.JWT_KEY, {expiresIn: "5h"}, (err, encoded) => {
            if(err) return endRequest(res, 500, "Internal server error")
            return endRequest(res, 200, "Login successful", encoded)
        })

    }catch(e){
        if(e.customError) return endRequest(res, e.statusCode, e.message)
        return endRequest(res, 500, "Internal server error")
    }
}

module.exports.getUser = async (req, res) => {
    try{
        let authToken = req.headers.authorization
        if(!authToken) return endRequest(res, 401, "Unauthorized request")
        authToken = authToken.split(" ")[1];
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
            if(err) return endRequest(res, 401, "Invalid or expired token")
            
            return endRequest(res, 200, decoded);
        })
        
    }catch(e){
        return endRequest(res, 500, "Internal server error")
    }
}