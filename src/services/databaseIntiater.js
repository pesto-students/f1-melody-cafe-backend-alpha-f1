const DatabaseManager = require('melody-cafe-datamodel/src/index');
const logger = require('./loggerService');
// eslint-disable-next-line no-undef
const dilect = process.env.DATABASE_DILECT || 'mysql';
// eslint-disable-next-line no-undef
const dbPassword = process.env.DATABASE_PASSWORD || 'TestMelody123';
// eslint-disable-next-line no-undef
const dbUser = process.env.DB_USER || 'admin';
// eslint-disable-next-line no-undef
const dbName = process.env.DB_NAME || 'melody-cafe-dev';
// eslint-disable-next-line no-undef
const dbHost = process.env.DB_HOST || 'melody-cafe.co84i787w0lc.us-east-2.rds.amazonaws.com'; 
// eslint-disable-next-line no-undef
const dbPort = process.env.DB_PORT || 3306;

async function getModels(){
    const databaseManager = new DatabaseManager(dilect, dbPassword, dbUser, dbName, dbHost , dbPort, logger);
    let connection = databaseManager.getConnection();
    let database = 'Melody-cafe-Dev';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    const Models = await databaseManager.syncTable();
    return Models;
}

module.exports = getModels;