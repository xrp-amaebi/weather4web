const request = require('request');


const forecast = ({ longitude, latitude }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6e6746ce6bd461360b19c4487f6155c4&query=${latitude},${longitude}`;

    request({ json: true, url }, (err, { body }) => {
        if(err) {
            callback("Something went wrong, Unable to find weather forecast, Try reconnecting to the Internet");
        } else if(body.error) {
            callback("Unable to collect forecast data, Try a different location");
        } else {
            callback(undefined, {  
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                precipitation: body.current.precip,
                observation_time: body.current.observation_time,
                location_time: body.location.localtime   
            });
        };
    });
};

module.exports = forecast;