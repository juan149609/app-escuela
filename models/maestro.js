'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var maestroSchema = schema({
    name: String,
    edad: Number,
    materia: String,
    image: String
});

module.exports = mongoose.model('maestro', maestroSchema);