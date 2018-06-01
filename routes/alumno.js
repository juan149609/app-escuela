'use strict'

var express = require('express');
var alumnoController = require('./../controllers/alumno');
var connectMultiparty = require('connect-multiparty');

var md_upload = connectMultiparty({ uploadDir: './upload/alumnos/' });

var api = express.Router();

api.get('/alumnos/:page?', alumnoController.getAlumnos);
api.post('/alumno', alumnoController.saveAlumno);
api.get('/alumno/:id', alumnoController.getAlumno);
api.delete('/alumno/:id', alumnoController.deleteAlumno);
api.put('/alumno/:id', alumnoController.updateAlumno);
api.post('/uploadImageAlumno/:id', md_upload, alumnoController.uploadImage);
api.get('/imageAlumno/:image', alumnoController.getImageAlumno);
api.get('/cuadroHonor', alumnoController.cuadroHonor);

module.exports = api;