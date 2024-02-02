// src/api/spotifyExample.js
const { from } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const spotifyApi = require('./spotifyApi');

function getUserPlaylists() {
  return from(spotifyApi.getUserPlaylists());
}

function createPlaylist(name, options = {}) {
  return from(spotifyApi.createPlaylist(name, options));
}

module.exports = {
  getUserPlaylists,
  createPlaylist
};
