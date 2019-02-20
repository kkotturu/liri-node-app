const inquirer = require("inquirer");
const axios = require("axios");
const moment = require("moment");

function getBand() {
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
                if (response.data.length) {
                    for (i = 0; i < response.data.length; i++) {
                        console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
                        console.log(`Artist Lineup: ${response.data[i].lineup.join(", ")}`);
                        console.log(`Venue Name: ${response.data[i].venue.name}`);
                        console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                        console.log("Date Of Concert: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                        console.log("|______________________________________|");
                        console.log("");
                    }
                } else {
                    console.log("No results found for the search : ( ")
                }


            })
    })
}

module.exports = {
    getBand: getBand,
}