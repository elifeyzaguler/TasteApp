// src/routes/spotifyRoutes.js
const express = require('express');
const router = express.Router();
const { getUserPlaylists, createPlaylist } = require('./api/userPlaylists');

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

module.exports = router;
