const { request } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// localhost:3000
app.get('/', (request, response, next) => {
  response.render('index');
});

// localhost:3000/beers
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  // returns a promise
  punkAPI
    .getARandomBeer()
    .then(beersFromApi => {
      console.log('random-beer');
      res.render('beer', beersFromApi);
    })
    .catch(err => console.error(err));
});
/*app.get("/home", (request, response, next) => {
  response.sendFile(__dirname + "/views/home.html");
});

// localhost:8080/works
app.get("/works", (request, response, next) => {
  response.sendFile(__dirname + "/views/works.html");
});*/

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
