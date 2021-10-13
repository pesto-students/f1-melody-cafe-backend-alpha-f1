const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();
const logger = Service.logger;

module.exports = {
    addAlbum: async function(name,type,userId){
        const Models = await Service.getModels();
        const album = {
          id: uuidv4(),
          name: name,
          type: type,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          updatedBy: userId,
        }   
        try{
          const createdAlbum = await Models.Album.create(album);
          return createdAlbum;                
        }catch(err){
          logger.error(`ERROR :: [ALBUMSERVICE] :: [ADDALBUM] :: ${err} `)
          throw err('ALBUM_CREATION_ERROR');
        }
    },
    getAlbums: async function(limit,offset,where){
       const Models = await Service.getModels();
       let albums = await Models.Album.findAndCountAll({
         limit:Number(limit),
         offset:Number(offset),
         where
       });
       return albums;   
    }
}