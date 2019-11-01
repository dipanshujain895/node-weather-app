const request = require('request');

const getGeoCode = (address, callback) => {

    //We'll have to encode this address using the encodeURIComponent()
    //It will automatically convert special charachters inside the string to what they should look like in URL
    //Ex: space or " " => "%20" in url
    const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGlwYW5zaHVqYWluODk1IiwiYSI6ImNrMjFqdm1ncjFmeXozbnF0MTB1d3prenIifQ.4IqhJl3CC7ZZ1IBQ6M8l4Q&limit=1";

    request({ url: mapUrl, json: true}, (error, response, body) => {
        if(error) {
            callback("Unable to connect to Location Services!!", undefined);    //since no data is there
        }
        else if(body.features.length === 0) {
            callback("Unable to find Longitude and Latitude for the given location!!, Try another search", undefined);
        }
        else {
            
            const features = body.features[0];  //to get first result
            callback(undefined, {
                latitude: features.center[1], 
                longitude: features.center[0], 
                location: features.place_name 
            });
        }
    });
}

module.exports = {
    getGeoCode: getGeoCode,
}