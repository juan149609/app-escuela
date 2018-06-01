'use strict'

var Alumno = require('./../models/alumno');
var fs = require('fs');
var path = require('path');

function getAlumnos (req, res){
	var page = req.params.page - 1;
	var itemPage = 6;
	Alumno.find().skip(page*itemPage).limit(itemPage).sort({'_id': -1}).exec((error, alumnos) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumnos){
			Alumno.count().exec((error2, count) => {
				if(error2){
					res.status(500).send({	
						message: 'Error en el Servidor'
					});
				} else if(count){
					res.status(200);
					var pages = Math.floor(count / itemPage);
					res.json({ alumnos, pages } );
				}else{
					res.status(404).send({
						message: 'no hay Alumnos'
					});
				}
			});
		}else{
			res.status(404).send({
				message: 'no hay Alumnos'
			});
		}
    });
	/*Alumno.find({}).sort({'_id': -1}).exec((error, alumnos) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumnos){
			res.status(200);
			res.json(alumnos);
		}else{
			res.status(404).send({
				message: 'no hay Alumnos'
			});
		}
    });*/
}

function getAlumno (req, res){
	var id = req.params.id;
	Alumno.findById(id).exec((error, alumno) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumno){
			res.status(200);
			res.json(alumno);
		}else{
			res.status(404).send({
				message: 'no existe el alumno'
			});
		}

    });
}

function saveAlumno(req, res){
	var alumno = new Alumno();

	var param = req.body.json;
	param = JSON.parse(param);

	if(param.name && param.edad && param.promedio){
		alumno.name = param.name;
		alumno.edad= param.edad;
		alumno.promedio = param.promedio;
	

		alumno.save((err, alumnoS) => {
			if(err){
				res.status(500).send({
					message: err
				});
			}
			else if(alumnoS){
				res.status(200);
				res.json(alumnoS);
			}
			else{
				res.status(200).send({
					message: 'no se guardar el alumno'
				});
			}
		});
	}
	else{
		res.status(500).send({
			message: 'todos los datos son obligatorios'
		});
	}
}

function deleteAlumno(req, res){
	var id = req.params.id;

	Alumno.findByIdAndRemove(id, (err, alumnoDelete) => {
		if(err){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumnoDelete){
			res.status(200);
			res.json(alumnoDelete);
		}else{
			res.status(404).send({
				message: 'no existe el alumno'
			});
		}
	});
}

function updateAlumno(req, res){
	var id = req.params.id;
	var datosNew = req.body.json;
	datosNew = JSON.parse(datosNew);

	Alumno.findByIdAndUpdate(id, datosNew, {new: true}, (err, alumnoNew) => {
		if(err){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumnoNew){
			res.status(200);
			res.json(alumnoNew);

		}else{
			res.status(404).send({
				message: 'no existe el alumno'
			});
		}
	});
}

function uploadImage(req, res){
	var id = req.params.id;
	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];
		var nameSplit = fileName.split('\.');

		var fileExt = nameSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg'){
			Alumno.findById(id, (error, alumno) => {
				if(error){
					res.status(500).send({	
						message: 'Error en el Servidor'
					});
				}else if(alumno){
					var imageAnterior = alumno.image;
					var fulPathAnterior = './upload/alumnos/' + imageAnterior;
					alumno.image = fileName;
					alumno.save();
					fs.unlink(fulPathAnterior, () => {});
					res.status(200);
					res.json(alumno);
				}else{
					res.status(404).send({
						message: 'no existe el alumno'
					});
				}

			});
			/*Alumno.findByIdAndUpdate( id, { image: fileName }, { new: true }, (error, alumnoNew) => {
				if(error){
					res.status(500).send({	
						message: 'Error en el Servidor'
					});
				}else if(alumnoNew){
					res.status(200);
					res.json(alumnoNew);
				}else{
					res.status(404).send({
						message: 'no existe el alumno'
					});
				}

			} );*/
		}else{
			fs.unlink(filePath, () => {
				res.status(404).send({
					message: 'Extencio no valida'
				});
			});
		}
	}else{
		res.status(200).send({
			message: 'No hay Imagen'
		});
	}
}

function getImageAlumno(req, res){
	var nameImage = req.params.image;
	var fullPath = './upload/alumnos/' + nameImage;

	fs.exists(fullPath, exists => {
		if(exists){
			res.sendFile(path.resolve(fullPath));
		}else{
			res.status(200).send({
				message: 'No existe la imagen'
			});
		}
	});
}

function cuadroHonor(req, res){
	Alumno.find().sort({'promedio': -1}).limit(10).exec((error, alumnos) => {
		if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(alumnos){
			res.status(200);
			res.json(alumnos);
		}else{
			res.status(404).send({
				message: 'no hay Alumnos'
			});
		}
	});
}

module.exports = {
	getAlumnos,
	getAlumno,
	saveAlumno,
	deleteAlumno,
	updateAlumno,
	cuadroHonor,
	uploadImage,
	getImageAlumno
}