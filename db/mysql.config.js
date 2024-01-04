const mysql = require('mysql2')

const dbconn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE
}).promise()
module.exports = dbconn