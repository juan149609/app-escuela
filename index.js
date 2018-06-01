'use strict'

var mongoose = require('mongoose');//VARIABLE DE PARA LA CONEXION DE MONGO
var app = require('./app');//VARIABLE PARA INICIAR EL SERVIDOR
mongoose.connect('mongodb://localhost:27017/escuela')//,{useMongoClient: true})//CONEXION A MONGO
		.then(() =>{//EN CADO DE EXITO
			console.log("Exito");
			app.listen(3800, () => {//INICIAMOS DEL SERVIDOR EN EL PUERTO 3800
				console.log('localhost:3800');
			});
		})
		.catch(err => {//EN CASO DE ERROR
			console.log(err);
		});	