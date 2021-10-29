const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();
const logger = Service.logger;

module.exports = {
    addAlbum: async function(name,type,userId,track){
        const Models = await Service.getModels();
        const album = {
          id: uuidv4(),
          name: name,
          type: type,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          updatedBy: userId,
          track: track
        }
        try{
          const createdAlbum = await Models.Album.create(album);
          return createdAlbum;                
        }catch(err){
          logger.error(`ERROR :: [ALBUMSERVICE] :: [ADDALBUM] :: ${err} `)
          throw err('ALBUM_CREATION_ERROR');
        }
    },
    getAlbums: async function(limit,offset){
       const Models = await Service.getModels();
       let albums = await Models.Album.findAndCountAll({
         limit:Number(limit),
         offset:Number(offset)
       });
       return albums;   
    },
    getAlbumById: async function(id){
      const Models = await Service.getModels();
      let album = await Models.Album.findOne({
        where:{
          id: id
        }
      })
      return album;
    },
    //
    updateAlbum: async function (id,name,userId,track) {
      const Models = await Service.getModels();
      let album = {
        name: name,
        updatedAt: Date.now(),
        updatedBy: userId,
        track: track
      };
      let updatedAlbum = await Models.Album.update(album,{
        where:{
          id: id
        }
      })
      return updatedAlbum;

    }
}