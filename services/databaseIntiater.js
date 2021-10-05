const DatabaseManager = require('melody-cafe-datamodel/src/index');
const logger = require('./loggerService');

async function getModels(){
    const databaseManager = new DatabaseManager('mysql', 'example', 'root', 'spotify', 'localhost', 3306, logger);
    const Models = await databaseManager.syncTable();
    return Models;
}

module.exports = getModels;