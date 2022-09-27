
const SQL= require('mysql');

//Conexion Basica
/*
const Conexion = SQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'miapp_node_bd'
}); */

//Conexion Con Varibles De Entorno
const Conexion = SQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

Conexion.connect(function(error){
    if(error){
        console.log(' 😒   ¡No Hay Conexion a La Base De Datos!   😒 ')
        //throw error;
        console.log(error);
        return;
    }else{
        console.log(' ¡Conectado a La Base De Datos!   😉👍 ')
    }
});

module.exports= Conexion;
//Conexion.end();