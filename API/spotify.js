require('dotenv').config();
const Spotify = require("node-spotify-api");
const keys = { id: process.env.SPOTIFY_API_ID, secret: process.env.SPOTIFY_SEC_ID }
const inquirer = require("inquirer");
const spotify = new Spotify(keys);


function getSong() {

    inquirer.prompt([
        {
            type: "input",
            name: "songName",
            message: "Which song would you like to look up?"
        },
    ]).then(function (user) {

        spotify
            .search({ type: 'track', query: user.songName })
            .then(function (response) {
                console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
                console.log(`Name Of Artists: ${response.tracks.items[0].artists[0].name}`)
                console.log(`Name Of Song: ${response.tracks.items[0].name}`)
                console.log(`Preview URL: ${response.tracks.items[0].preview_url}`)
                console.log(`From The Album: ${response.tracks.items[0].album.name}`)
                console.log("|______________________________________|")

                // random song lookup
                inquirer.prompt([

                    {
                        type: "input",
                        name: "rand",
                        message: "Want to see a Random Song?(yes/no)"
                    },
                ]).then(function (user) {
                    var random = "In my Blood"
                    // if the user presses yes
                    user.rand.toLowerCase();
                    if (user.rand == "yes" || user.rand == "y")
                        spotify
                            .search({ type: 'track', query: random })
                            .then(function (response) {
                                console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
                                console.log(`Name Of Artists: ${response.tracks.items[0].artists[0].name}`)
                                console.log(`Name Of Song: ${response.tracks.items[0].name}`)
                                console.log(`Preview URL: ${response.tracks.items[0].preview_url}`)
                                console.log(`From The Album: ${response.tracks.items[0].album.name}`)
                                console.log("|______________________________________|")
                            })
                    else if (user.rand == "no" || user.rand == "n") {
                        console.log("\nOk, see you later :)\n");
                    }
                })
            })
    })

        .catch(function (err) {
            console.log(err);
        });
}
module.exports = {
    getSong: getSong,
}