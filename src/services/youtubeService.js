const ServiceIntiater = require('./serviceIntiaters');
const Service = new ServiceIntiater();
const logger = Service.logger;
const getAuth = require('./googleApiServiceIntiater');


// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.

module.exports = {
    getTrendingSongs: async function(queryFilter,type){
     let youtube = await getAuth()
     let result;
     try{
     if(type==='trending'){
       result =  await youtube.videos.list(queryFilter);  
     }else{
        result =  await youtube.search.list(queryFilter);
     }
     logger.info('[YOUTUBESERVICE]:: [TRENDINGSONG] :: [RESULT]',result);
     if(result.data){
         return result.data
     }
     return {
         code: 'BAD_REQUEST',
         message: 'GOOGLE_API_ERROR'
     }   
    }catch(err){
        logger.error(`[YOUTUBESERVICE :: [TRENDINGSONG] :: `,err)
        throw new Error('GOOGLE API ERROR')
    }
    },
    getPlaylist: async function(id){
        let query = {
            part:'snippet,contentDetails',
            id: id, 
            maxResults: 10
        };
        let youtube = await getAuth();
        try{
            let result =await youtube.playlists.list(query);
            if(result.data){
                return result.data
            }
            return {
                code: 'BAD_REQUEST',
                message: 'GOOGLE_API_ERROR'
            }
        }catch(err){
            logger.error(`[YOUTUBESERVICE]::[GETPLAYLISTDATA]::[err]`,err);
            throw Error('GOOGLE API ERROR')
        }    
    },
    getPlaylistItem: async function(playlistId){
        let query ={
            part:'snippet,contentDetails',
            playlistId: playlistId,
            maxResults: 50        
        }
        let youtube = await getAuth();
        let result;
        try{
            result = await youtube.playlistItems.list(query);
            return result;
        }catch(err){
            logger.error(`[YOUTUBESERVICE]::[GETPLAYLISTITEM]::[err]`,err);
            throw('GOOGLE API ERROR')
        }
    },
    getSong: async function (p) {
        
    }
}