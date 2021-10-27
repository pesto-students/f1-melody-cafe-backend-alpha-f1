const youtubeService = require('../../src/services/youtubeService');
async  function test(){
  let result = await youtubeService.getTrendingSongs();
  console.log(result);
}
test()