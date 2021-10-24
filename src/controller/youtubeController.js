const { query } = require('../services/loggerService');
const logger = require('../services/loggerService');
const youtubeService = require('../services/youtubeService');

module.exports = {
    getSongs: async function(req,res){
        if(req.query.type='trending'){
           query['chart'] = "mostPopular",
           query['videoCategoryId'] = "10",
           query['regionCode'] = "IN"
        }
        logger.debug('[YOUTUBECONTROLLER] :: [GETTRENDINGSONG]:: ',req);
        try{
        let result = await youtubeService.getTrendingSongs(query);
        if(result.code){
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
        }catch(err){
            logger.error('[YOUTUBECONTROLLER] :: [GET-TRENDING-SONG]  ',err)
        }
    }
}