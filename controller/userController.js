const logger = require('../services/loggerService');
const userService = require('../services/userService');
module.exports = {
    getUserById: async function(req,res){
        try{
          const {id} = req.params;
          const user = await userService.getUserbyId(id);
          return res.status(200).send(user);
        }catch(err){
            logger.error(`ERROR :: [USERCONTROLLER] :: [getUserById] :: ${JSON.stringify(err)}`);
            res.status(404).send(err);
        }
    }
}