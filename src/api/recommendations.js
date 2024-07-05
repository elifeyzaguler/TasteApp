const { from } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const spotifyApi = require('./spotifyApi');

function getRecommendations(options) {
  return from(spotifyApi.getRecommendations(options));
}

module.exports = {
    getRecommendations
};
