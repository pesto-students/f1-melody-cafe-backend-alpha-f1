const logger = require('./loggerService');
const  getModels = require('./databaseIntiater');
class ServiceIntiater{
    constructor(){
     this.logger = logger;
     this.models;  
   }
  async getModels(){
    if(this.models){
        return this.models;
    }
    this.models = await getModels();
    return this.models;
  }
}


module.exports = ServiceIntiater;
