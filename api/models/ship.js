const mongoose = require("mongoose");
//test

//tworze schemat, mmsi Maritime Mobile Service Identity 
const shipSchema = mongoose.Schema({
    name:String,
    flag:String,
    mmsi:String,
    inPort:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Port"
    }
});

//exportuje model na podstawie schematu model, 
module.exports = mongoose.model("Ship",shipSchema);