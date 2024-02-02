const express = require('express');
const { authorizeURL, handleAuthorization } = require('./auth/auth');
const processConfig = require("./config");
const { error } = require('console');
const routes = require('./routes');
const bodyParser = require('body-parser');
const spotifyApi = require('./api/spotifyApi');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.get('/login', (req, res) => {
  res.redirect(authorizeURL);
});

app.get('/callback', (req, res) => {
  const { code } = req.query;
  
  if (code){
    handleAuthorization(code).subscribe({next: (result) => {
        console.log(result);
        res.send(result);
      }, complete: ()=>{
        spotifyApi.getMe()
        .then(function(data) {
          console.log('Some information about the authenticated user', data.body);
        }, function(err) {
          console.log('Something went wrong!', err);
        });
      }});
  }

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
