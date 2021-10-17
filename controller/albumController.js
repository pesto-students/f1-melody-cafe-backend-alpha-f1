const logger = require('../services/loggerService');
const albumService = require('../services/albumService');
module.exports = {
    addAlbum: async function(req,res){
            const {name,type,userId}  = req.body;
             try{
               let createdAlbum = await albumService.addAlbum(name,type,userId);
               return res.status(201).send(createdAlbum)
             }catch(err){
                logger.error(`[ALBUM-CONTROLLER] :: [ADDALBUM] :: `,err);s
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'ADDALBUM_NOT_AVAIABLE',
                    message: 'ERROR WHILE ADDING THE ALBUM'
                }  
                return res.status(500).send(errObj)
            }
    },
    getAlbums: async function(req,res){
        try{
        let limit  = req.query.limit;
        let offset = req.query.offset;
        let where = req.body.where || {};
        const albums = await albumService.getAlbums(limit,offset,where);
         return res.status(200).send(albums)
        }catch(err){
            logger.error(`[ALBUM-CONTROLLER] :: [ADDALBUM] :: `,err);
            let errObj = {
                type: 'INTERNAl_SERVICE_ERROR',
                code: 'GETALBUM_NOT_AVAIABLE',
                message: 'ERROR WHILE GETTING THE ALBUM'
            }  
            return res.status(500).send(errObj);        
        }
    },
    getAlbumById:  async function(req,res){
        try{
            let id = req.params.id;
            const albums = await albumService.getAlbumById(id);
             return res.status(200).send(albums)
            }catch(err){
                logger.error(`[ALBUM-CONTROLLER] :: [GETALBUMBYID] :: `,err);
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'GETALBUMBYID_NOT_AVAIABLE',
                    message: 'ERROR WHILE GETTING THE ALBUM'
                }  
                return res.status(500).send(errObj);        
            }        
    }
}