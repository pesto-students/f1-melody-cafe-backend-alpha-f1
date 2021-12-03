const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtClient = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://melody-cafe.us.auth0.com/.well-known/jwks.json`
    }),
    audience: 'https://master.d2kw5hl91dwpos.amplifyapp.com/',
    issuer: 'https://melody-cafe.us.auth0.com/',
    algorithms: [ 'RS256' ]
});
module.exports = jwtClient;


