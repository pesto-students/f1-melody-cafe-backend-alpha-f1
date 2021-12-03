const logger = require('../services/loggerService');
const youtubeService = require('../services/youtubeService');
const playlistQuery = {
    regionCode: "IN",
    part: 'snippet',
    maxResults: 48,
    type: 'playlist', 
}
const artistQuery =   {
    part: 'snippet',
    regionCode: "IN",
    maxResults: 48,
    type: 'channel'
} 
const trendingQury ={
    part: 'snippet,id,contentDetails',
    chart:'mostPopular', 
    videoCategoryId: 10,
    regionCode:"IN",    
    maxResults: 48,
    type: 'video'
 }

 const videoQuery ={
    part: 'snippet,id',
    videoCategoryId: 10,
    regionCode:"IN",    
    maxResults: 48,
    type: 'video'
 }
module.exports = {
    getSongs: async function(req,res){
        let {type} = req.query || false;
        console.log(type);
        console.log(typeof type);
        let query={};
        switch(type){
            case('trending'):
             query = trendingQury;
             break;
            case('artist'):
             query = artistQuery;
             query.q = req.query.search;
            break;
            case('playlist'):
            query = playlistQuery;
            query.q = req.query.search;
            break;              
        }
        logger.debug('[YOUTUBECONTROLLER] :: [GETTRENDINGSONG]:: ',req);
        try{
            if(type){
            console.log('query',query);
            let result = await youtubeService.getTrendingSongs(query,req.query.type);
            if(result.code){
                return res.status(500).send(result);
            }
            return res.status(200).send(result);
            }else{
                let result ={count:0,records:[]};
                let trendingSongQuery = videoQuery;
                trendingSongQuery.q = req.query.search;
                trendingSongQuery.maxResults = 5;
                let songs = await youtubeService.getTrendingSongs(trendingSongQuery,'video');
                result.count = result.count + songs.items.length;
                result.records= result.records.concat(songs.items)
                if(result.code){
                    return res.status(500).send(result);
                }
                return res.status(200).send(result);
            }
       
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