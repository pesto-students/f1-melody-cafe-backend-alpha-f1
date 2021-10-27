const {google} = require('googleapis');
const getAuth =  function(){
    /*
    const auth = await authenticate({
        keyfilePath: path.join(__dirname,'../../apiKey.json'),
        scopes: ['https://www.googleapis.com/auth/youtube'],
      });
      */
      const youtube = google.youtube({
        version: 'v3',
        // eslint-disable-next-line no-undef
        auth: process.env.YOUTUBEKEY || 'AIzaSyDKt8YZA-I1MSRDuJlG_7OL47ouiNtzQJ0'
      });
      return youtube;
}

module.exports = getAuth;