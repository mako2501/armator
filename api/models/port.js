const mongoose = require("mongoose");

//tworze schemat,
const portSchema = mongoose.Schema({
    name:String,
    flag:String,
    /*ships:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Ship"
    }]*/
});

//exportuje model na podstawie schematu model , 
module.exports = mongoose.model("Port",portSchema);