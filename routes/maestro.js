'use strict'

var express = require('express');
var maestroController = require('./../controllers/maestro');
var connectMultiparty = require('connect-multiparty');

var md_upload = connectMultiparty({ uploadDir: './upload/maestros/' });

var api = express.Router();

api.get('/maestros/:page?', maestroController.getMaestros);
api.post('/maestro', maestroController.saveMaestro);
api.get('/maestro/:id', maestroController.getMaestro);
api.delete('/maestro/:id', maestroController.deleteMaestro);
api.put('/maestro/:id', maestroController.updateMaestro);
api.post('/uploadImageMaestro/:id', md_upload, maestroController.uploadImage);
api.get('/imageMaestro/:image', maestroController.getImageMaestro);


module.exports = api;