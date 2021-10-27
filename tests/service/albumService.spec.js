const { add } = require('winston');
const { addAlbum } = require('./../../services/albumService');

async function testAlbumService(){
   let createdAlbum = await addAlbum('Treding In India','systemAlbum','7e258ad8-1bc5-44d3-b82a-612f1a52eb17');
   setTimeout(()=>{
      console.log(createdAlbum)
   },10000)
}
testAlbumService();