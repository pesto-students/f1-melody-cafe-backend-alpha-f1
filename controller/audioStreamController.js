const logger = require('../services/loggerService');
const ytdl = require('ytdl-core');
const fs = require('fs');
module.exports = {
    streamSong: async function(req,res){
        try{
            let url = req.query.url;
            console.log('>>>>>>>>>>> url',url);
            ytdl(url)
            .pipe(res);
        }catch(err){
            logger.error(`[ERROR]:: [AUDIOSTREAMCONTROLLER] :: [STREAMSOG] :: `,err);
            return res.status(500);
        }
    }
}