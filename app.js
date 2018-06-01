'use strict'

var express = require('express');//Noderequire preguntar
var bodyParse = require('body-parser');
var app = express();

// cargar Rutas
var alumnoRouter = require('./routes/alumno');

var maestroRouter = require('./routes/maestro');

var fakerRouter = require('./routes/faker');
// body-parse
app.use(bodyParse.urlencoded({extended:false}));//AGREGAMOS LOS MIDERWARE
app.use(bodyParse.json());

// configurar CORD
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.get('/hola', (req, res) => {//CREAMOS UNA RUTA
	res.send({
		menssage: 'Esta es una pruena'
	});
});

app.use('/api', alumnoRouter);
app.use('/api', maestroRouter);
app.use('/api', fakerRouter);

module.exports = app;//EXPORTAMOS LA VARIABLE APP PARA PODER USAR ESTE MODELO