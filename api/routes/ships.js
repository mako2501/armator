const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

//importuje model z models (model na podstawie schematu mongoose)
const Ship = require("../models/ship");

//importuje kontroler
const ShipController = require("../controllers/ships");

router.get('/', ShipController.ships_get_all);

//jesli checkAuth sie wykona to zrobi next 
router.post('/', checkAuth, ShipController.ships_add_new);

router.get('/:shipId', ShipController.ship_get_one_byId);

router.put('/:shipId', checkAuth, ShipController.ship_edit_byId);

router.delete('/:shipId', checkAuth, ShipController.ship_del_byId);

router.put('/:shipId/port/:portId', checkAuth, ShipController.ship_add_to_port);

router.delete('/:shipId/port/', checkAuth, ShipController.ship_remove_from_port);

module.exports = router;
