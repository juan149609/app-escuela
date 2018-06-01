'use strict'
var Alumno = require('./../models/alumno');
var Maestro = require('./../models/maestro');
var faker = require('faker');

var alumnoController = require('./../controllers/alumno');
var maestroController = require('./../controllers/maestro');

function crearAlumno(){
    var alumno = new Alumno();
    alumno.name = faker.name.findName();
    alumno.edad = faker.random.number({min: 5, max: 29});
    alumno.promedio = faker.random.number({min: 70, max: 100});
    alumno.save();
}

function crearMaestro(){
    var maestro = new Maestro();
    maestro.name = faker.name.findName();
    maestro.edad = faker.random.number({min: 30, max: 100});
    maestro.materia = faker.lorem.word();
    maestro.save();
}

function generar(req, res){
    for(var i = 0; i < 100; i++){
        crearAlumno();
        crearMaestro();
    }
    res.status(200).send({	
        message: 'ok'
    });
}

module.exports = {
    generar
}