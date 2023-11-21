// importuję expresa
const express = require('express');

// tworzę instancję expresa
const app = express();

//IMPORTUJE ZMIENNE SRODOWISKOWE
require('dotenv').config();

//łącze z baza danych
const mongoose = require("mongoose");
//mongodb+srv://admin:admin123@mako.vsvieor.mongodb.net/library?retryWrites=true&w=majority - bylo tak, ale ze mam 
mongoose.connect("mongodb+srv://"+ process.env.DB_USERNAME +":"+ process.env.DB_PASSWORD +"@mako.vsvieor.mongodb.net/armator?retryWrites=true&w=majority");

// logger
const morgan = require('morgan');
app.use(morgan('combined'));

// parsuję body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routy
/*const bookRoutes = require('./api/routes/books');
app.use('/books', bookRoutes);*/
const shipsRoutes = require('./api/routes/ships.js');
app.use('/ships', shipsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: 'Nie znaleziono ' });
});

module.exports = app;
