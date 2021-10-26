const { query } = require('../services/loggerService');
const logger = require('../services/loggerService');
const youtubeService = require('../services/youtubeService');

module.exports = {
    getSongs: async function(req,res){
        let query={}
        if(req.query.type == 'trending'){
            query = {
            part: 'snippet',
            chart:'mostPopular', 
            videoCategoryId: 10,
            regionCode:"IN",    
            maxResults: 50,
            type: 'video'
          }
        }
        if(req.query.type==='artist'){
            query = {
                q: req.query.search,
                part: 'snippet',
                regionCode:"IN",
                videoCategoryId: 10,    
                maxResults: 5,
                type: 'channel'
              } 
        }

        
        if(req.query.type==='playlist'){
            query = {
                q: req.query.search,
                part: 'snippet',
                videoCategoryId: 10,
                regionCode:"IN",    
                maxResults: 50,
                type: 'playlist'
              } 
        }
        logger.debug('[YOUTUBECONTROLLER] :: [GETTRENDINGSONG]:: ',req);
        try{
        let result = await youtubeService.getTrendingSongs(query,req.query.type);
        if(result.code){
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
        }catch(err){
            logger.error('[YOUTUBECONTROLLER] :: [GET-TRENDING-SONG]  ',err)
        }
    }
}