// perform npm install
// perform npm init
// install npm i node-spotify-api
// install npm i spotify
// install npm i inquirer
// install npm i axios
// install npm i moment

const inquirer = require('inquirer');
const spotify = require("./API/spotify");
const movie = require("./API/omdb");
const band = require("./API/bands");
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
    console.log(`Hi, ${user.name}`);

    switch (user.choice) {
        case "spotify":
            //SPotify method
            spotify.getSong();
            break
        case "omdb":
            // OMDB method
            movie.getMovie();
            break
        case "bandsintown":
            // bands method
            band.getBand();
            break
        default:
            console.log("Try again")
            break
    }

})



