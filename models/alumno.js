'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var alumnoSchema = schema({
    name: String,
    edad: Number,
    promedio: Number,
    image: String
});

module.exports = mongoose.model('alumno', alumnoSchema);