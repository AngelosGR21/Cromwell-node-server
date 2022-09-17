const parseData = require("./utils/parseData")
const bcrypt = require("bcrypt")
const endRequest = require("./utils/endRequest")

const { insertUser } = require("./models");

module.exports.postUser = async (req, res) => {
    try{
        const {email, firstName, lastName, password} = await parseData(req)
        
        if(!email || !firstName || !lastName || !password) return endRequest(res, 400, "Bad request")

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/
        
        if(!email.match(emailRegex) || !password.match(passwordRegex)) return endRequest(res, 400, "Bad request")
        
        const hashedPassword = await bcrypt.hash(password, 10)

        await insertUser({email, firstName, lastName, hashedPassword});

        return endRequest(res, 200, "User has been created")
    }catch(e){
        console.log(e)
        if(e.code === "23505") return endRequest(res, 409, "Email is already in use") 
        return endRequest(res, 500, "Internal server error")
    }
}