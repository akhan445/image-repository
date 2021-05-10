//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/route.js');

const app = express();

app.use(express.json()); //post raw json data on post request
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public/images')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

// database connection
require('./database/database.js');

app.use(routes);

app.listen(3000, function() {
  console.log("Server running on port 3000");
})
