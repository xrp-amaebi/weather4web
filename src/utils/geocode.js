const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXRlcm5hbGdlcmFzIiwiYSI6ImNrY2ExbnZxeDFvOTAyenFwdDhuemQzcHkifQ._7W1bWQ6TMa43hUEhYFKSw&limit=1`;

    request({ json: true, url }, (err, { body }) => {
        if (err) {
            callback("Something went wrong, Unable to find a running location service, Try reconnecting to your internet service provider");
        } else if (body.features.length == 0) {
            callback("Unable to find location, Try a different Search Query");
        } else {
            callback(undefined, {
                location: {
                    longitude: body.features[0].center[0],
                    latitude: body.features[0].center[1],
                    city: body.features[0].place_name
                }
            });
        };
    });
};

module.exports = geocode;
