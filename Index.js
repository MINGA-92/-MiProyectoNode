
const { json } = require('express');
const express= require('express');
const Constructor= express();
const Keys= require("./Controles/Keys.js");
console.log("Keys= ", Keys);
console.log("Keys= ", Keys.key );

const dotenv= require('dotenv');
dotenv.config({path:'./env/.env'});

Constructor.use('/Recursos', express.static('img'));
Constructor.use('/Recursos', express.static(__dirname + '/img'));
console.log("__dirname= ", __dirname);

const bcryptjs= require('bcryptjs');

const session= require('express-session');

Constructor.use(session({
    secret: 'ClaveSecreta',
    resave: true,
    saveUninitialized: true
}));


Constructor.set('view engine', 'ejs');
Constructor.set('key', Keys.key);



Constructor.use(express.urlencoded({extended:false}));
Constructor.use('/', require('./router'));
Constructor.use(express(json));
Constructor.use(express.json);

Constructor.listen(5000, function(Peticion, Respuesta){
    console.log("Aplicacion Corriendo En http://localhost:5000         (⌐■_■)");
});

