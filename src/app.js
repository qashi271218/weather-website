const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const app = express();
//Define path for Express config
const directory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(directory));
app.get('', (req, res) => {
    res.render('index', {
        title: 'coding',
        name: 'Qasim',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'We Are',
        name: 'Qasim',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'we are here to help you',
        title: 'Help',
        name: 'Qasim',
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please enter an address!',
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(location, (error, forecastData) => {
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must enter search term',
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help page',
        name: 'Qasim',
        message: 'help article not found',
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Qasim',
        message: 'page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});