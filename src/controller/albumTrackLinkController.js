const logger = require('../services/loggerService');
const albumTrackService = require('../services/albumTrackLinkService');
module.exports = {
    addSongToPlaylist:  async function(req,res){
        try{
            let {albumId,trackId} = req.params;
            const albums = await albumTrackService.addTrackToAlbum(albumId,trackId);
             return res.status(200).send(albums)
            }catch(err){
                logger.error(`[ALBUM-TRACK-CONTROLLER] :: [ADDSONGTOPLAYLIST] :: `,err);
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'ADDSONGTOPLAYLIST_NOT_AVAIABLE',
                    message: 'ERROR WHILE ADDING SONG TO ALBUM'
                }  
                return res.status(500).send(errObj);        
            }        
    },
    getSongsFromAlbum: async function(req,res){
        try{
            let {albumId} = req.param;
            const tracks = await albumTrackService.getTrackFromAlbum(albumId);
             return res.status(200).send(tracks)
            }catch(err){
                logger.error(`[ALBUM-TRACK-CONTROLLER] :: [GETSONGSFROMALBUM] :: `,err);
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'GETSONGTOPLAYLIST_NOT_AVAIABLE',
                    message: 'ERROR WHILE GETTING SONGS FROM ALBUM'
                }  
                return res.status(500).send(errObj);        
            }
    }
}