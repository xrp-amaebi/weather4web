const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT || 3001;

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars Engine and views Location
app.set("view engine", 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to Serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marques Brownlee'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: "Marques Brownlee",
        email: 'amaebiamara@support.com',
        phone: '+2347030868562',
        github: 'github.io/xrp-amaebi'
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'ABOUT AUTHOR',
        name: 'Marques Brownlee',
        email: 'marquesbrownlee@gmail.com',
        phone: '+2347030868562',
        github: 'github.io/xrp-amaebi',
        text: "My Name is Marques.. Im a Tech Enthusiast and and Graphic Designer, I come from Delaware Texas, I am infamous for making Tech reviews on Youtube where I talk about almost anthing relating to new fascinating technology. I love what I do and most days I do it very well, So well sometimes I get interviews with CEOs of Awesome Tech Companies like Microsoft and Tesla...its all on Youtube.. Take a Look around this new website where I take Weather data from Anywhere around the world and feed it as a web application..."
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a query string for address'
        });
    };

    geocode(req.query.address, (err, { location } = {}) => {
        if (err) {
            return res.send({ err });
        };

        forecast(location, (err, forecast) => {
            if (err) {
                return res.send({ err })
            };

            res.send({
                city: location.city,
                forecast
            });
        });
    });
});

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide Query string for search'
        });
    } else {
        res.send({
            products: []
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: "Amara Amaebi",
        message: "Help Article Not Found"
    });
});

app.get("*", (req, res) => {
    res.render('error', {
        title: "404",
        name: "Marques Brownlee",
        message: "Page not found"
    });
});


app.listen(port, () => {
    console.log(`server running...[Port: ${port}]`);
});