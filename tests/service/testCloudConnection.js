const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    let database = 'melody-cafe-dev'
    const connection = await mysql.createConnection({ host:'melody-cafe.co84i787w0lc.us-east-2.rds.amazonaws.com' ,port: 3306 , user: 'admin' , password:'TestMelody123' });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    // connect to db
    // init models and add them to the exported db object
}
