const express = require('express');
const router = express.Router();

//importuje model z models (model na podstawie schematu mongoose)
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//zakladanie konta
router.post("/signup",(req,res,next) =>{
    //TODO: SPRAWDZIC CZY EMAIL JUZ NIE ISTNIEJE
    //tworze hash
    bcrypt.hash(req.body.password, 10).then((hash) => {
        // Store hash in your password DB.        
        const user = new User({
            email: req.body.email,
            password: hash,
        });
    //zapisuje nowego uzytkownika na podstawie modelu
    user.save()
        .then(() => res.status(500).json({  wiadomoc:"Dodano usera" }))
        .catch(err => res.status(500).json(err));
    });     
});

//logowanie
router.post("/login", (req, res, next) =>{
    //znajdz po email usera select * from users where email = req.body.email
    User.findOne({email:req.body.email})
        .then(user =>{
            //jesli nie ma takiego usera po email
            if(!user) return res.status(401).json({wiadomosc: "Błąd autoryzacji"});
            //jesli jet user spr. bcrypt.compare(myPlaintextPassword, hash)
            bcrypt.compare(req.body.password, user.password).then(function(result) {                
                if(!result)
                    return res.status(401).json({wiadomosc: "Błąd autoryzacji"});//w przeciwnym wypadku zrobi sie 
                //kolejny return czyli ok, generuje tokena
                //jwt.sign(payload, secretOrPrivateKey, [options, callback])
                const token = jwt.sign({email:user.email},process.env.JWT_KEY,{expiresIn:"1h"});
                return res.status(200).json({ token });
            });            
        });    
});

module.exports = router;