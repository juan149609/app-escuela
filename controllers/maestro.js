'use strict'

var Maestro = require('./../models/maestro');
var fs = require('fs');
var path = require('path');

function getMaestros (req, res){
	var page = req.params.page - 1;
	var itemPage = 6;
	Maestro.find().skip(page*itemPage).limit(itemPage).sort({'_id': -1}).exec((error, maestros) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(maestros){
			Maestro.count().exec((error2, count) => {
				if(error2){
					res.status(500).send({	
						message: 'Error en el Servidor'
					});
				} else if(count){
					res.status(200);
					var pages = Math.floor(count / itemPage);
					res.json({ maestros, pages } );
				}else{
					res.status(404).send({
						message: 'no hay Maestros'
					});
				}
			});
		}else{
			res.status(404).send({
				message: 'no hay Alumnos'
			});
		}
    });
	/*Maestro.find({}).sort({'_id': -1}).exec((error, Maestros) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(Maestros){
			res.status(200);
			res.json(Maestros);
		}else{
			res.status(404).send({
				message: 'no hay Maestros'
			});
		}

    });*/
}

function getMaestro (req, res){
	var id = req.params.id;
	Maestro.findById(id).exec((error, Maestro) => {
        if(error){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(Maestro){
			res.status(200);
			res.json(Maestro);
		}else{
			res.status(404).send({
				message: 'no existe el Maestro'
			});
		}

    });
}

function saveMaestro(req, res){
	var maestro = new Maestro();

	var param = req.body.json;
	param = JSON.parse(param);

	if(param.name && param.edad && param.materia){
		maestro.name = param.name;
		maestro.edad= param.edad;
		maestro.materia = param.materia;
	

		maestro.save((err, maestroS) => {
			if(err){
				res.status(500).send({
					message: 'Erroren en el Servido'
				});
			}
			else if(maestroS){
				res.status(200);
				res.json(maestroS);
			}
			else{
				res.status(200).send({
					message: 'no se guardar el maestro'
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

function deleteMaestro(req, res){
	var id = req.params.id;

	Maestro.findByIdAndRemove(id, (err, maestroDelete) => {
		if(err){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(maestroDelete){
			res.status(200);
			res.json(maestroDelete);
		}else{
			res.status(404).send({
				message: 'no existe el maestro'
			});
		}
	});
}

function updateMaestro(req, res){
	var id = req.params.id;
	var datosNew = req.body.json;
	datosNew = JSON.parse(datosNew);
	Maestro.findByIdAndUpdate(id, datosNew, {new: true}, (err, maestroNew) => {
		if(err){
			res.status(500).send({	
				message: 'Error en el Servidor'
			});
		}else if(maestroNew){
			res.status(200);
			res.json(maestroNew);
		}else{
			res.status(404).send({
				message: 'no existe el maestro'
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
			Maestro.findById(id, (error, maestro) => {
				if(error){
					res.status(500).send({	
						message: 'Error en el Servidor'
					});
				}else if(maestro){
					var imageAnterior = maestro.image;
					var fulPathAnterior = './upload/maestros/' + imageAnterior;
					maestro.image = fileName;
					maestro.save();
					fs.unlink(fulPathAnterior, () => {});
					res.status(200);
					res.json(maestro);
				}else{
					res.status(404).send({
						message: 'no existe el maestro'
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

function getImageMaestro(req, res){
	var nameImage = req.params.image;
	var fullPath = './upload/maestros/' + nameImage;

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

module.exports = {
	getMaestro,
	getMaestros,
	saveMaestro,
	deleteMaestro,
	updateMaestro,
	uploadImage,
	getImageMaestro
}