// perform npm install
// perform npm init
// install npm i node-spotify-api
// install npm i spotify
// install npm i inquirer
// install npm i axios
// install npm i moment

const inquirer = require('inquirer');
const axios = require("axios");
const moment = require("moment");

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify)

// User questions
inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What your name???"
    },

    {
        type: "list",
        name: "choice",
        message: "Select your option from the list?",
        choices: ["spotify", "omdb", "bandsintown"]
    },

]).then(function (user) {
    // Spotify song lookup

    if (user.choice === "spotify") {
        console.log("Hi" + user.name)

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
                            console.log("\nOk, see you later :)\n")
                        }
                    })
                })
        })

            .catch(function (err) {
                console.log(err);
            });

    }

    // OMDB Movie lookup

    else if (user.choice === "omdb") {
        console.log("Hi" + user.name);

        inquirer.prompt([
            {
                type: "input",
                name: "artist",
                message: "Which movie would you like to look up?"
            },
        ]).then(function (user) {
            queryUrl = "http://www.omdbapi.com/?t=" + user.artist + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(

                function (response) {
                    console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|");

                    console.log("Release Title: " + response.data.Title);
                    console.log("Runtime: " + response.data.Runtime);
                    console.log("The Release Year: " + response.data.Year);
                    console.log("ImdbRating: " + response.data.imdbRating);
                    console.log("Rated: " + response.data.Rated);
                    console.log("Country produced: " + response.data.Country);
                    console.log("Language of movie: " + response.data.Language);
                    console.log("Plot of the Movie: " + response.data.Plot);
                    console.log("Actors of the Movie: " + response.data.Actors);

                    console.log("|______________________________________|");

                    // Random movie lookup
                    inquirer.prompt([

                        {
                            type: "input",
                            name: "rand",
                            message: "Want to see a Random Movie?(yes/no)"
                        },
                    ]).then(function (user) {
                        var randomMovie = "Hunger Games"
                        // if the user presses yes
                        user.rand.toLowerCase();
                        if (user.rand == "yes" || user.rand == "y") {
                            queryUrl = "http://www.omdbapi.com/?t=" + randomMovie + "&y=&plot=short&apikey=trilogy";
                            axios.get(queryUrl).then(
                                function (response) {
                                    console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|");

                                    console.log("Release Title: " + response.data.Title);
                                    console.log("Runtime: " + response.data.Runtime);
                                    console.log("The Release Year: " + response.data.Year);
                                    console.log("ImdbRating: " + response.data.imdbRating);
                                    console.log("Rated: " + response.data.Rated);
                                    console.log("Country produced: " + response.data.Country);
                                    console.log("Language of movie: " + response.data.Language);
                                    console.log("Plot of the Movie: " + response.data.Plot);
                                    console.log("Actors of the Movie: " + response.data.Actors);

                                    console.log("|______________________________________|");
                                })
                        }
                        else if (user.rand == "no" || user.rand == "n") {
                            console.log("\nOk, see you later :)\n")
                        }

                    })
                })
        })

    }

    // Bands in town
    else {
        console.log("Hi" + user.name);

        inquirer.prompt([
            {
                type: "input",
                name: "artist",
                message: "Which band would you like to look up?"
            },

        ]).then(function (user) {
            var queryUrl = "https://rest.bandsintown.com/artists/" + user.artist + "/events?app_id=codingbootcamp";

            axios.get(queryUrl).then(
                function (response) {
                    for (i = 0; i < response.data.length; i++) {
                        console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
                        console.log(`Artist Lineup: ${response.data[i].lineup.join(", ")}`);
                        console.log(`Venue Name: ${response.data[i].venue.name}`);
                        console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                        console.log("Date Of Concert: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                        console.log("|______________________________________|");
                        console.log("");
                    }


                })
        })
    }

})