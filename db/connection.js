const {Pool} = require("pg");

require("dotenv").config({
    path: `${__dirname}/../.env.development`
})

if(!process.env.PGDATABASE){
    throw new Error('PGDATABASE is not set')
}

module.exports = new Pool(config)