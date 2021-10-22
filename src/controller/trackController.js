const logger = require('../services/loggerService');
const trackService = require('../services/TrackService');
module.exports = {
    addTrack: async function(req,res){
        try{
         const {filePath,name} = req.body;
         const track = await trackService.addTrack(filePath,name);
         return res.status(201).send(track)
        }catch(err){
            logger.error(`[TRACK-CONTROLLER] :: [ADDTRACK] :: `,err);
            let errObj = {
                type: 'INTERNAl_SERVICE_ERROR',
                code: 'ADDTRACK_NOT_AVAIABLE',
                message: 'ERROR WHILE ADDING TRACK'
            }  
            return res.status(500).send(errObj);        
        }
    },
    getTrackbyId: async function(req,res){
        try{
            let {id} = req.params;
            const track = await trackService.getTrackById(id);
            return res.status(200).send(track);
        }catch(err){
            logger.error(`[TRACK-CONTROLLER] :: [ADDTRACK] :: `,err);
            let errObj = {
                type: 'INTERNAl_SERVICE_ERROR',
                code: 'ADDTRACK_NOT_AVAIABLE',
                message: 'ERROR WHILE ADDING TRACK'
            }  
            return res.status(500).send(errObj);      
        }
    }
}