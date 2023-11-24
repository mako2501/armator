//od razu eksportuje metody
const Ship = require("../models/ship");
exports.ships_get_all = (req, res, next) => {
    Ship.find().populate("inPort")
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Lista wszystkich statków' ,
        info:result
      });
    })
    .catch(err => res.status(500).json(err));
}

exports.ships_add_new =  (req, res, next) => {
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
}

exports.ship_get_one_byId = (req, res, next) => {
    const id = req.params.shipId;
    Ship.findById(id).populate("inPort")
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Szczegóły statku o id: ' + id,
        info:result
      });
    })
    .catch(err => res.status(500).json(err));   
}

exports.ship_edit_byId = (req, res, next) => {
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
}

exports.ship_del_byId = (req, res, next) => {
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
}

exports.ship_add_to_port = (req, res, next) => {
  const filter = {_id: req.params.shipId}
  const update = {inPort: req.params.portId}
  Ship.findOneAndUpdate(filter, update)
  .then(result=>{
    res.status(200).json({ 
      wiadomosc: 'Dodanie do statku: ' + result.name +' portu '+ result.inPort,
      info:result 
    });    
  })
  .catch(err => res.status(500).json(err));  
}

exports.ship_remove_from_port = (req, res, next) => {
  const filter = {_id: req.params.shipId}
  const update = {inPort: null}
  Ship.findOneAndUpdate(filter, update)
  .then(result=>{
    res.status(200).json({ 
      wiadomosc: 'Usunięcie statku: ' + result.name +' z portu',
      info:result 
    });    
  })
  .catch(err => res.status(500).json(err));  
}

