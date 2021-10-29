const logger = require('../services/loggerService');
const albumService = require('../services/albumService');
const validationService= require('../services/validationService');

module.exports = {
    addAlbum: async function(req,res){
            const keys = ["name","type","userId"]
            const validObject = validationService.checkMadatoryKeys(keys,req.body);
            if(!validObject.valid){
                return res.status(400).send({
                    type: "parameters missing",
                    code: "require parameters not passed",
                    message: "REQUIRED_PARAMETER_NOT_PASSED"
                })
            }
            const {name,type,userId,track}  = req.body;
            let stringifyTrack = [];
            try{
               if(!track){
                stringifyTrack = JSON.stringify(stringifyTrack)
               }else{
                stringifyTrack = JSON.stringify(track)
               }
               let createdAlbum = await albumService.addAlbum(name,type,userId,stringifyTrack);
               return res.status(201).send(createdAlbum)
             }catch(err){
                logger.error(`[ALBUM-CONTROLLER] :: [ADDALBUM] :: `,err);
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
        const albumsResult = await albumService.getAlbums(limit,offset);
        let albums = albumsResult.rows;
     //   console.log(albums);
        for(let index= 0; index<albums.length;index++){
            console.log(albums[index].dataValues)
    
         if(albums[index].dataValues.track !== null){
              albums[index].dataValues.track =  JSON.parse(albums[index].dataValues.track)
          }else{
            albums[index].dataValues.track = []
          }
        }
         return res.status(200).send({count: albumsResult.count, row: albums})
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
    },
    updateAlbumController: async (req,res)=>{
        try{
            let id = req.params.id;
            let {name,track,userId} = req.body;
            if(track){
                const albums = await albumService.getAlbumById(id);
                let trackString = albums.track;
                let tracks = JSON.parse(trackString);
                let updatedTrack;
                if(track.length){
                    updatedTrack = [...tracks, ...track];
                }else{
                    updatedTrack = [track,...tracks];
                }
                if(name){
                    let updatedAlbum = await albumService.updateAlbum(id,name,userId,updatedTrack);
                    return res.status(200).send(updatedAlbum);
                }
                let updatedAlbum = await albumService.updateAlbum(id,albums.name,userId,updatedTrack);
                return res.status(200).send(updatedAlbum);
            }
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