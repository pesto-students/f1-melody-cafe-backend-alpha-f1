const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();
const logger = Service.logger;
module.exports = {
    addUser: async function(firstName,lastName,userName,id){
        let Models = await Service.getModels();
        let user = {
            id:id,
            firstName: firstName,
            lastName: lastName,
            userName,userName,
            userType: 'Non-premium',
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
        
       
    },
    updateUser: async function(id,firstName = null,lastName=null,userType=null,metaData=null){
        let user = {
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            updatedAt: Date.now(),
            userMeta: JSON.stringify(metaData),
        };
        user = removeEmpty(user);
        let Models = await Service.getModels(user);
        user = await Models.User.update(user, {
            where: {
              id: id
            }
          });
    }
}

const removeEmpty = (obj) => {
    Object.entries(obj).forEach(([key, val])  =>
      (val && typeof val === 'object') && removeEmpty(val) ||
      (val === null || val === "") && delete obj[key]
    );
    return obj;
};