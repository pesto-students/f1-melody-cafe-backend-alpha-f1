const path = require('path');
const {google} = require('googleapis');
const getAuth = async function(){
    /*
    const auth = await authenticate({
        keyfilePath: path.join(__dirname,'../../apiKey.json'),
        scopes: ['https://www.googleapis.com/auth/youtube'],
      });
      */
      const youtube = await google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBEKEY || 'AIzaSyBHlYqHGN8kaxlwsqf-mKaUAtPBU0dOBBU'
      });
      return youtube;
}

module.exports = getAuth;