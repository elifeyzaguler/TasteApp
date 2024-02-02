const { from } = require('rxjs');
const { mergeMap, catchError, tap } = require('rxjs/operators');
const spotifyApi = require('../api/spotifyApi');

const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-playback-state', 'playlist-modify-public', 'playlist-modify-private', 'user-library-read', 'user-library-modify'], 'state');

function handleAuthorization(code) {
    return from(spotifyApi.authorizationCodeGrant(code)).pipe(
      tap((data) => {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      })
    );
  }

module.exports = {
  authorizeURL,
  handleAuthorization,
};
