const format = require("pg-format");
const db = require("./connection")
const testData = require("./data/test-data")

const createUserTable = async () => {

    await db.query(`DROP TABLE IF EXISTS users;`);

    await db.query(`
        CREATE TABLE users (
            first_name VARCHAR NOT NULL,
            last_name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL
        );
    `)

}

const seed = async () => {
    
    await createUserTable()
    const formattedUserData = testData.map(({firstName, lastName, email, password}) => [firstName, lastName, email, password])

    const insertUsersData = format(
        `INSERT INTO users (first_name, last_name, email, password) VALUES %L RETURNING *;`, formattedUserData
    )
    
    return db.query(insertUsersData)
}

module.exports = seed;