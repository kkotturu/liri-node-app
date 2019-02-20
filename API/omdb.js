const inquirer = require("inquirer");
const axios = require("axios");
function getMovie() {

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

module.exports = {
    getMovie: getMovie,
}