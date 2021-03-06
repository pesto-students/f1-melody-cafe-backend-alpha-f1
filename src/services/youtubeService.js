const ServiceIntiater = require('./serviceIntiaters');
const Service = new ServiceIntiater();
const logger = Service.logger;
const getAuth = require('./googleApiServiceIntiater');
const ytdl = require('ytdl-core')

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.

module.exports = {
    getTrendingSongs: async function(queryFilter,type){
     let youtube =  getAuth()
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
        let youtube =  getAuth();
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
            maxResults: 48        
        }
        let youtube =  getAuth();
        let result;
        try{
            result = await youtube.playlistItems.list(query);
            return result.data;
        }catch(err){
            logger.error(`[YOUTUBESERVICE]::[GETPLAYLISTITEM]::[err]`,err);
            throw('GOOGLE API ERROR')
        }
    },
    getSong: async function (id,quality='high') {
        let MAP ={
            'high':0,
            'medium': 1,
            'low':2
        };
      let data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`, {
          quality: "highestaudio",
        })
      let filtered_data =  ytdl.filterFormats(data.formats, "audioonly");
      return filtered_data[MAP[`${quality}`]].url;
    }
}