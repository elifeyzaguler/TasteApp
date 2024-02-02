const SpotifyWebApi = require('spotify-web-api-node');
const config = require('../config');


const spotifyApi = new SpotifyWebApi(config);

module.exports = spotifyApi;
