const mysql = require ('mysql2/promise');

const connection = mysql.createPool({
    host: 'maxencemazeauportfolio.com',
    user: 'u962314789_StatsUp',
    password: 'Golami05',
    database: 'u962314789_StatsUp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})

module.exports = connection;