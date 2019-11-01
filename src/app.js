const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 2244;  //getting from heroku

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const geoCodeServices = require('./utils/geocode');
const forecastServices = require('./utils/forecast');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipanshu Jain'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dipanshu Jain'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dipanshu Jain'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        res.send({
            error: "You must provide an address!!"
        });
    }
    else {
        const address = req.query.address
        geoCodeServices.getGeoCode(address, (error, data) => {
            if(error) {
                return res.send({ error: error });
            }
            else {
                const { latitude, longitude, location } = data;
                forecastServices.getForecast(latitude, longitude , (error, forecast) => {
                    if(error) {
                        res.send({ error: error });
                    }
                    else {
                        return res.send({
                            forecast: forecast,
                            location: location,
                            address: address
                        }); 
                    }
                });
            }
        });
        // })
        // res.send({
        //     forecast: 'It is snowing',
        //     location: 'Philadelphia',
        //     address: req.query.address
        // });
    }

});




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dipanshu Jain',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dipanshu Jain',
        errorMessage: 'Page not found.'
    });
});

//We need to specify the port in app.listen from the heroku's provided ports
app.listen(port, () => {
    console.log("Server running at http://localhost:"+port);
});