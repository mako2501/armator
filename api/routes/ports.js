const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

//importuje model z models (model na podstawie schematu mongoose)
const Port = require("../models/port");

//importuje kontroler
const PortController = require("../controllers/ports");

router.get('/', PortController.ports_get_all);

//jesli checkAuth sie wykona to zrobi next 
router.post('/', checkAuth, PortController.ports_add_new);

router.get('/:portId', PortController.port_get_one_byId);

router.put('/:portId', checkAuth, PortController.port_edit_byId);

router.delete('/:portId', checkAuth, PortController.port_del_byId);

router.get("/:portId/ships",PortController.get_ships_in_port);

module.exports = router;
