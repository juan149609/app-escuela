'use strict'

var express = require('express');
var faker = require('./../controllers/faker');

var api = express.Router();

api.get('/generar', faker.generar);

module.exports = api;