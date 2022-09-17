function endRequest (res, statusCode, data, token) {
    res.statusCode = statusCode
    if(token) res.setHeader("Authorization", `Bearer ${token}`);
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({data}))
}

module.exports = endRequest