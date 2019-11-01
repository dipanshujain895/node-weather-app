const request = require('request');

const getForecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/4cc212ac0c9678448d4cbb847930269c/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "/?units=si";

    request({ url: url, json: true }, (error, response, body) => {
        if(error) {
            callback("Unable to Connect to Weather Servers!!", undefined);
        }
        else if(body.error) {
            callback("Unable to find location!!", undefined);
        }
        else {
            const weatherData = body.currently;
            const weeklyData = body.daily.data;

            const forecast = weeklyData[0].summary + ' It is currently ' + weatherData.temperature + ' degress out. This high today is ' + weeklyData[0].temperatureHigh + ' with a low of ' + weeklyData[0].temperatureLow + '. There is a ' + weatherData.precipProbability + '% chance of rain.';
            callback(undefined, forecast);
        }
    });

};


module.exports = {
    getForecast: getForecast,
};