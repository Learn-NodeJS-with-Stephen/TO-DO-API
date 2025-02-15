const mysql = require('mysql2');
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: '',
    database: 'todo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// pool.on('acquire', function (connection) {
//     console.log('Connection %d acquired', connection.threadId);
// });

module.exports = pool.promise();

//install mysql2
//setup your db.js use .env
//setup your connection too in th index.js
// CRUD
// C - Create - INSERT
// R - Read - SELECT
// U - Update - UPDATE
// D - Delete - DELETE
