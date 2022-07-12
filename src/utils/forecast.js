const req = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ffb5c704312938007f2daedb8380ed02&query=${lat},${long}`;
    req.get(url, { json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to load request at the moment');
        } else if (body.error) {
           callback('Unable to find this location. try other search')
        } else {
            const current = body.current;
            callback(null, current);
        }
    });
}

module.exports = forecast;