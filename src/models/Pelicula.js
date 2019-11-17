"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peliculasSchema = new Schema({
  titulo: {type: String},
  genero: {type: String},
  anio: {type: String},
  duracion: {type: String},
  descripcion: {type: String},
  estado: {type: String},
  ruta_imagen: {type: String},
  ruta_video: {type: String},
 });

 const peliculas = mongoose.model("movies", peliculasSchema);

module.exports = peliculas;