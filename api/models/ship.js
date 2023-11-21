const mongoose = require("mongoose");
//test

//tworze schemat, mmsi Maritime Mobile Service Identity 
const shipSchema = mongoose.Schema({
    name:String,
    flag:String,
    mmsi:String
});

//exportuje model na podstawie schematu model Book, 
module.exports = mongoose.model("Ship",shipSchema);