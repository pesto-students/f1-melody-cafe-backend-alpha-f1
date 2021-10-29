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
        auth: process.env.YOUTUBEKEY || 'AIzaSyAMIQnJrVVCCao2DLLUEpdSVmGb9fF-K0w'
      });
      return youtube;
}

module.exports = getAuth;