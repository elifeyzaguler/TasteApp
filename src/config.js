const path = require('path');

const result = require('dotenv').config({path: path.resolve(__dirname, "./.env")});
if(result.error){
    console.log(".env file couldn't be loaded!");
    process.exit();
} else {
    console.log(".env file is loaded");
}

const config = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
};

module.exports = config;
