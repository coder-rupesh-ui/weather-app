const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPaths = path.join(__dirname, '../templates/views'); // default is template so no need to do if that is the case
const partialsPath = path.join(__dirname, '../templates/partials');

// console.log(__dirname);
// console.log(publicDirPath);

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPaths)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Rupesh'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rupesh'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        msg: "You're stuck, No worries we have sorted already",
        name: 'Rupesh'
    });
});
app.get('/weather', (req, res) => {
    // console.log(req.query);
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {temperature, feelslike} = {}) => {
            if(error) {
                return res.send({error});
            }
            // console.log(`There is currently ${chalk.invSuccess(temperature)} degree and it feels like is ${chalk.invError(feelslike)} degrees out in ${chalk.warn(place)}`);
            res.send({
                temperature,
                feelslike,
                place
            });
        });
    });
    /*res.send({
        forecast: 'It is raining',
        location: 'Pune',
        address: req.query.address
    });*/
});
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Rupesh'
    });
});
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Rupesh'
    });
});
app.listen(port, () => {
    console.log('server is up on port 3000.')
});