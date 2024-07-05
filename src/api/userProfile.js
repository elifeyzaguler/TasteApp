// src/api/spotifyExample.js
const { from } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const spotifyApi = require('./spotifyApi');

function getUserProfileDetails() {
  return from(spotifyApi.getMe());
}

module.exports = {
  getUserProfileDetails
};
