const DatabaseManager = require('melody-cafe-datamodel/src/index');
const logger = require('./loggerService');

async function getModels(){
    const databaseManager = new DatabaseManager('mysql', 'TestMelody123', 'admin', 'melody-cafe-dev', 'melody-cafe.co84i787w0lc.us-east-2.rds.amazonaws.com', 3306, logger);
    let connection = databaseManager.getConnection();
    let database = 'Melody-cafe-Dev';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    const Models = await databaseManager.syncTable();
    return Models;
}

module.exports = getModels;