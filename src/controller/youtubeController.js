const logger = require('../services/loggerService');
const youtubeService = require('../services/youtubeService');

module.exports = {
    getSongs: async function(req,res){
        let query={}
        if(req.query.type == 'trending'){
            query = {
            part: 'snippet,id,contentDetails',
            chart:'mostPopular', 
            videoCategoryId: 10,
            regionCode:"IN",    
            maxResults: 50,
            type: 'video'
          }
        }
        if(req.query.type=='artist'){
            query = {
                q: req.query.search,
                part: 'snippet',
                maxResults: 10,
                type: 'channel'
              } 
        }

        
        if(req.query.type=='playlist'){
            query = {
                q: req.query.search,
                part: 'snippet',
                maxResults: 10,
                type: 'playlist', 
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
            return res.status(500).send({
                code: "INTERNAL_SERVER_ERROR",
                message: "there is internal server error", 
            });
        }
    },
    getPlaylistData: async function(req,res){
        let {id} = req.params;
        try{
         let result = await youtubeService.getPlaylist(id);
         return res.status(200).send(result);
        }catch(err){
            logger.error('[YOUTUBECONTROLLER] :: [GET-TRENDING-SONG]  ',err)
            return res.status(500).send({
                code: "INTERNAL_SERVER_ERROR",
                message: "there is internal server error", 
            });
        }
    },
    getPlaylistItems: async function(req,res){
        let {playlistId} = req.params;
        try{
            let result = await youtubeService.getPlaylistItem(playlistId);
            return res.status(200).send(result);          
        }catch(err){
            logger.error('[YOUTUBECONTROLLER] :: [GET-PLAYLIST-ITEM]  ',err)
            return res.status(500).send({
                code: "INTERNAL_SERVER_ERROR",
                message: "there is internal server error", 
            });
        }
    },
    getSong: async function(req,res){
        let {id} = req.params;
        if(!id){
            return res.status(400).send('BAD REQUEST')
        }
        let {quality} = req.query || 'high';
     try{
        let result = await youtubeService.getSong(id,quality);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.send(result);
     }catch(err){
        logger.error(`[YOUTUBECONTROLLER]:: [GETSONG] :: `,err);
        return res.status(500).send({
            code: "INTERNAL_SERVER_ERROR",
            message: "there is internal server error", 
        });
     }
     
    }
}