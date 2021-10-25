const ServiceIntiater = require('./serviceIntiaters');
const Service = new ServiceIntiater();
const logger = Service.logger;
const getAuth = require('./googleApiServiceIntiater');


// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.

module.exports = {
    getTrendingSongs: async function(queryFilter){
     let youtube = await getAuth()
     let result =  await youtube.search.list(queryFilter);  
     logger.info('[YOUTUBESERVICE]:: [TRENDINGSONG] :: [RESULT]',result);
     if(result.data){
         return result.data
     }
     return {
         code: 'BAD_REQUEST',
         message: 'GOOGLE_API_ERROR'
     }   
    }
}