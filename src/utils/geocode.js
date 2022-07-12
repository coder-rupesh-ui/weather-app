const req = require('postman-request');

const geocode = (address, callback) => {
    const geocodeUrl = 'http://api.positionstack.com/v1/forward?access_key=2d7e8e9d9482d4f0820d2ba3f957d866&query=' + encodeURIComponent(address);
    req.get(geocodeUrl, {json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to load request at the moment');
        } else if (body.error && body.error.code === 'validation_error') {
            callback('Unable to find this location. try other search');
        } else {
            const latitude = body.data[0].latitude;
            const longitude = body.data[0].longitude;
            const place = body.data[0].name;
            callback(undefined, {
                latitude,
                longitude,
                place
            })
        }
    });
}

module.exports = geocode;