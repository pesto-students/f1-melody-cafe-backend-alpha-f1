const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();
const logger = Service.logger;
module.exports = {
    addUser: async function(firstName,lastName,userName,userType){
        let Models = await Service.getModels();
        let user = {
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            userName,userName,
            userType: userType,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
         try{
            let createdUser = await Models.User.create(user);
            return createdUser;                
        }catch(err){
           logger.error(`ERROR :: [USERSERVICE] :: [ADDUSER] :: ${JSON.stringify(err)} `)
            throw err('USER_CREATION_ERROR');
        }
    },
    getUserbyId: async function(id){
        let Models = await Service.getModels();
        try{
            let user = await Models.User.findOne({
                where: {
                    id: id
                }
            });
            return user; 
        }catch(err){
            logger.error(`ERROR :: [USERSERVICE] :: [GETUSERBYID] :: ${err}`);
            throw('ERROR WHILE GETTING USERBYID');
        }
        
       
    }
}