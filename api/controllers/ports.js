//od razu eksportuje metody
const Port = require("../models/port");
const Ship = require("../models/ship");
exports.ports_get_all = (req, res, next) => {
    Port.find()
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Lista wszystkich portów' ,
        info:result
      });
    })
    .catch(err => res.status(500).json(err));
}

exports.ports_add_new =  (req, res, next) => {
    const port = new Port({
      name: req.body.name,
      flag: req.body.flag
    });
    port.save()
      .then(result => {
        res.status(201).json({
          wiadomosc: 'Dodanie nowego portu',
          info: result
        });
      })
      .catch(err => res.status(500).json(err));  
}

exports.port_get_one_byId = (req, res, next) => {
    const id = req.params.portId;
    Port.findById(id)
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Szczegóły portu o id: ' + id,
        info:result
      });
    })
    .catch(err => res.status(500).json(err));   
}

exports.port_edit_byId = (req, res, next) => {
    const id = req.params.portId;
    const port = {
      name: req.body.name,
      flag: req.body.flag 
      }
  
    //jako partametr daje sie id i obiekt ktory bedziemy podmieniac
    Port.findByIdAndUpdate(id, port)
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Zmiana danych portu o nr: ' + id,
        info:result 
      });    
    })
    .catch(err => res.status(500).json(err));  
}

exports.port_del_byId = (req, res, next) => {
    const id = req.params.portId;
    Port.findByIdAndDelete(id)
    //nie pisze w tu result jak wczesniej bo ten obiekt mnie nie interesuje, chce tylko id a biore je z url
    //mozna dorobic gdy nie bylo id to dostaje 404
    .then(result=>{
      res.status(200).json({ 
        wiadomosc: 'Usunięcie portu o numerze ' + id, 
        info: result
      });
    })
    .catch(err => res.status(500).json(err));   
}

exports.get_ships_in_port = (req, res, next) =>{
  const portId = req.params.portId;
  Ship.find({inPort : portId})
          .then(result =>{
            res.status(200).json({
              wiadomosc: "Statki w porcie " + portId,
              info:result
            });
          })
          .catch(err => res.status(500).json(err)); 
}

exports.get_ships_in_port_byName = (req, res, next) =>{
  const portName = req.params.portName;
  //.populate("ships") Port.findOne({name: byName}).__id}
  //const port = Port.findOne({name: byName});
  //const findPort = Port.findOne({name: byName},"_id");
  Port.findOne({name: portName})
  //Ship.find({inPort: Port.findOne({name: portId})._id})
    .then(result=>{
        Ship.find({inPort : result._id})
          .then(result2 =>{
            res.status(200).json({
              wiadomosc: "Statki w porcie " + portName,
              info:result2
            });
          })
          .catch(err => res.status(500).json(err));      
    })
    .catch(err => res.status(500).json({wiadomosc:"Nie ma takiego portu"}));
}
