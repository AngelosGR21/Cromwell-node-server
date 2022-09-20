function endRequest (res, statusCode, data, token) {
    res.setHeader("Content-Type", "application/json")
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(token) {
        res.setHeader("Access-Control-Expose-Headers", "Authorization")
        res.setHeader("Authorization", `Bearer ${token}`)
    }
    res.statusCode = statusCode
    res.end(JSON.stringify({data}))
}

module.exports = endRequest