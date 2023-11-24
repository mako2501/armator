const mongoose = require("mongoose");
//test

//tworze schemat
const userSchema = mongoose.Schema({
    email:String,
    password:String
});

//"Model",schema - exportuje model na podstawie schematu 
module.exports = mongoose.model("User",userSchema);