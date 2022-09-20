function endRequest (res, statusCode, data, token) {
    res.statusCode = statusCode
    if(token) res.setHeader("Authorization", `Bearer ${token}`);
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET")
    res.end(JSON.stringify({data}))
}

module.exports = endRequest