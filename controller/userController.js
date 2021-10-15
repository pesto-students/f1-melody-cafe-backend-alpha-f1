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
    },
    addUser: async function(req,res){
        try{
            const {firstName,lastName,userName}= req.body;
            try{
               let createdUser = await userService.addUser(firstName,lastName,userName);
               // change usertype as non-premium default
               return res.status(200).send(createdUser)
             }catch(err){
                logger.error(`[USER-CONTROLLER] :: [ADDALBUM] :: `,err);s
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'ADDUSER_NOT_AVAIABLE',
                    message: 'ERROR WHILE ADDING THE USER'
                }  
                return res.status(500).send(errObj)
             }
        }catch(err){
            logger.error(`ERROR :: [USERCONTROLLER] :: [getUserById] :: ${JSON.stringify(err)}`);
            let errObj = {
                type: 'REQUIRED_PARAMETERS_MISSING',
                code: 'REQUIRD PARAMERTRS ARE MISSING firstName,lastName,userName,userType',
                message: 'pass the required parametres firstName,lastName,userName,userType'
             }
             return res.status(404).send(errObj);
        }
    },
    editUser: async function(req,res){
        const {firstName,lastName,userType,userMeta}= req.body;
        const {id} = req.params;
        try{
          let updatedUser = userService.updateUser(id,firstName,lastName,userType,userMeta);
        }catch(err){
            logger.error(`[USER-CONTROLLER] :: [ADDALBUM] :: `,err);s
            let errObj = {
                type: 'INTERNAl_SERVICE_ERROR',
                code: 'ADDUSER_NOT_AVAIABLE',
                message: 'ERROR WHILE ADDING THE USER'
            }  
            return res.status(500).send(errObj)           
        }  
    }
}