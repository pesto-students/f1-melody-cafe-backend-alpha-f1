const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();
const logger = Service.logger;

module.exports = {
    addTrackToAlbum: async function(albumId,trackId){
        const Models = await Service.getModels();
        try{
          const addedTrack = await Models.AlbumTrack.create({
            albumId: albumId,
            trackId: trackId
          });
          return addedTrack;                
        }catch(err){
          throw Error('TRACK_CREATION_ERROR');
        }
    },
    getTrackFromAlbum: async function(albumId){
        const Models = await Service.getModels();
        const tracks = await Models.AlbumTrack.findAndCountAll({
            where: {
                albumId: albumId
            },
            include:[{
                model: 'Track',
                required: true
            }]
        })       
        return tracks;
    }
}