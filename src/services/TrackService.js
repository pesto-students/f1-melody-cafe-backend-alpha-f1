const ServiceIntiater = require('./serviceIntiaters');
const { v4: uuidv4 } = require('uuid');
const Service = new ServiceIntiater();

module.exports = {
    addTrack: async function(filePath,name){
        const Models = await Service.getModels();
        const track = {
          id: uuidv4(),
          filePath: filePath,
          name: name,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }   
        try{
          const createdTrack = await Models.Track.create(track);
          return createdTrack;                
        }catch(err){
          console.log(err)
          throw err('TRACK_CREATION_ERROR');
        }
    },
    getTrackById: async function(id){
       const Models = await Service.getModels();
       let track = await Models.Track.fineOne({
           where:{
               id: id
           }
       })
      return track;
    }
}