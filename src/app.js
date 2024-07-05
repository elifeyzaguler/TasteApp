const express = require('express');
const { authorizeURL, handleAuthorization } = require('./auth/auth');
const processConfig = require("./config");
const { error } = require('console');
const routes = require('./routes');
const bodyParser = require('body-parser');
const spotifyApi = require('./api/spotifyApi');

const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3001",
  //methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use('/', routes);

app.get('/login', (req, res) => {
  res.redirect(authorizeURL);
});

app.get('/callback', (req, res) => {
  const { code } = req.query;
  
  // if (code){
  //   handleAuthorization(code).subscribe({next: (result) => {
  //       console.log(result);
  //       res.send(result);
  //     }, complete: ()=>{
  //       spotifyApi.getMe()
  //       .then(function(data) {
  //         console.log('Some information about the authenticated user', data.body);
  //       }, function(err) {
  //         console.log('Something went wrong!', err);
  //       });
  //     }});
  // }

  if(code) {
    handleAuthorization(code).subscribe({
      next: (result) => {
        console.log(result);

        spotifyApi.setAccessToken(result.body.access_token);
        spotifyApi.setRefreshToken(result.body.refresh_token);

        spotifyApi.getMe()
          .then(function(data) {
            console.log("Information about the authenticated user ", data);

            res.redirect('http://localhost:3001/user-profile');
          })
          .catch(function(err) {
            console.log('Something went wrong!', err);
            res.send('An error occured.')
          });
      },
      error: (err) => {
        console.log('Error during authorization: ', err);
        res.send('An error occured during authorization.');
      },
      complete: () => {
        console.log('Authorization complete!');
      }
    });
  } else {
    res.send('No authorization code found.');
  }

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
