require('dotenv').config();
const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'icomon',
    port: process.env.DB_PORT || 3306,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = conexao;