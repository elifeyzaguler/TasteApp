const { from } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const spotifyApi = require('./spotifyApi');

function searchTracks(query) {
    return from(spotifyApi.searchTracks(query));
}

function searchArtists(query) {
    return from(spotifyApi.searchArtists(query))
}

module.exports = {
    searchTracks,
    searchArtists
}