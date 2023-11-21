const express = require('express');
const router = express.Router();

//importuje model z models (model na podstawie schematu mongoose)
const Ship = require("../models/ship");

router.get('/', (req, res, next) => {
    Ship.find()
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Lista wszystkich statków' ,
        info:result
      });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res, next) => {
  //tworze obiekt na podstawie wczesniej zaimportowanego modelu ksiazki na podstawie schematu, potem moge korzystac z mongoosa np metoda save
  const ship = new Ship({
    name: req.body.name,
    mmsi: req.body.mmsi,
    flag: req.body.flag
  });
  //zapis ksiazki i opcje gdy sie uda lub nie, result to obiekt zwracany gdy sie uda, czyli to nowo utworzony obiekt
  ship.save()
    .then(result => {
      res.status(201).json({
        wiadomosc: 'Dodanie nowego statku',
        info: result
      });
    })
    .catch(err => res.status(500).json(err));  
});

router.get('/:shipId', (req, res, next) => {
  const id = req.params.shipId;
  Ship.findById(id)
  .then(result=>{
    res.status(200).json({ 
      wiadomosc: 'Szczegóły statku o id: ' + id,
      info:result
    });
  })
  .catch(err => res.status(500).json(err));   
});

router.put('/:shipId', (req, res, next) => {
  const id = req.params.shipId;
  const ship = {
    name: req.body.name,
    mmsi: req.body.mmsi,
    flag: req.body.flag 
    }

  //jako partametr daje sie id i obiekt ktory bedziemy podmieniac
  Ship.findByIdAndUpdate(id, ship)
  .then(result=>{
    res.status(200).json({ 
      wiadomosc: 'Zmiana danych statku o nr: ' + id,
      info:result 
    });    
  })
  .catch(err => res.status(500).json(err));  
});

router.delete('/:shipId', (req, res, next) => {
  const id = req.params.shipId;
  Ship.findByIdAndDelete(id)
  //nie pisze w tu result jak wczesniej bo ten obiekt mnie nie interesuje, chce tylko id a biore je z url
  //mozna dorobic gdy nie bylo id to dostaje 404
  .then(result=>{
    res.status(200).json({ 
      wiadomosc: 'Usunięcie statku o numerze ' + id, 
      info: result //gdy drugi raz usuwam po id tym samym to ten result jest null i tu moze warto spr. i dac inny kod    np 404  
    });
  })
  .catch(err => res.status(500).json(err));   
});

module.exports = router;
