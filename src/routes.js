// src/routes/spotifyRoutes.js
const express = require('express');
const router = express.Router();
const { getUserPlaylists, createPlaylist } = require('./api/userPlaylists');
const { getRecommendations } = require('./api/recommendations');
const { getUserProfileDetails } = require('./api/userProfile')
const { parse } = require('path');

// Example route for getting user playlists
router.get('/playlists', (req, res) => {
  getUserPlaylists().subscribe({next:
    (data) => {
      res.json(data.body.items);
    }, error:
    (error) => {
      console.error('Error getting user playlists:', error);
      res.status(500).send('Error getting user playlists');
    }}
  );
});

router.post('/create-playlist', (req, res) => {
    const playlistName = req.body.name || 'My New Playlist';
    const playlistDescription = req.body.description || '';
    const isPublic = req.body.public || true;
  
    createPlaylist(playlistName, { description: playlistDescription, public: isPublic }).subscribe({next: (data) => {
        console.log('Playlist created!');
        res.json(data.body);
      }, error:  (error) => {
        console.error('Error creating playlist:', error);
        res.status(500).send('Error creating playlist');
      }}
    );
  });

router.get('/get-recommendations', (req, res) => {
    payload = {
      limit: 20
    }
    // payload = req.query;

    if(req.query.seed_artists){
      payload.seed_artists = [req.query.seed_artists]
    }
    if(req.query.seed_genres){
      payload.seed_genres = [req.query.seed_genres]
    }
    if(req.query.seed_tracks){
      payload.seed_tracks = [req.query.seed_tracks]
    }
    if(req.query.min_acousticness){
      payload.min_acousticness = parseFloat(req.query.min_acousticness)
    }
    if(req.query.max_acousticness){
      payload.max_acousticness = parseFloat(req.query.max_acousticness)
    }
    if(req.query.min_danceability){
      payload.min_danceability = parseFloat(req.query.min_danceability)
    }
    if(req.query.max_danceability){
      payload.max_danceability = parseFloat(req.query.max_danceability)
    }
    if(req.query.min_energy){
      payload.min_energy = parseFloat(req.query.min_energy)
    }
    if(req.query.max_energy){
      payload.max_energy = parseFloat(req.query.max_energy)
    }
    if(req.query.min_instrumentalness){
      payload.min_instrumentalness = parseFloat(req.query.min_instrumentalness)
    }
    if(req.query.max_instrumentalness){
      payload.max_instrumentalness = parseFloat(req.query.max_instrumentalness)
    }
    if(req.query.min_liveness){
      payload.min_liveness = parseFloat(req.query.min_liveness)
    }
    if(req.query.max_liveness){
      payload.max_liveness = parseFloat(req.query.max_liveness)
    }
    if(req.query.min_loudness){
      payload.min_loudness = parseFloat(req.query.min_loudness)
    }
    if(req.query.max_loudness){
      payload.max_loudness = parseFloat(req.query.max_loudness)
    }
    if(req.query.min_tempo){
      payload.min_tempo = parseFloat(req.query.min_tempo)
    }
    if(req.query.max_tempo){
      payload.max_tempo = parseFloat(req.query.max_tempo)
    }
    if(req.query.min_valence){
      payload.min_valence = parseFloat(req.query.min_valence)
    }
    if(req.query.max_valence){
      payload.max_valence = parseFloat(req.query.max_valence)
    }
    // if(mode){
    //   payload.mode = parseInt(req.query.mode)   // 0 or 1 
    // }
    if(req.query.min_popularity){
      payload.min_popularity = parseInt(req.query.min_popularity)
    }
    if(req.query.max_popularity){
      payload.max_popularity = parseInt(req.query.max_popularity)
    }

    console.log("payload", payload);

    getRecommendations(payload).subscribe({next: (data) => {
      console.log('Get recommendations successful!');
      res.json(data.body);
    }, error:  (error) => {
      console.error('Error getting recommendations:', error);
      res.status(500).send('Error getting recommendations!');
    }}
  );
})

router.get('/get-me', (req, res) => {
    getUserProfileDetails().subscribe({
      next: (data) => {
        console.log('User profile details fetched.');
        res.json(data.body);
      }, error: (error) => {
        console.log('Error fetching user profile details: ', error);
        res.status(500).send('Error fetching user profile details.');
      }
    })
})

module.exports = router;
