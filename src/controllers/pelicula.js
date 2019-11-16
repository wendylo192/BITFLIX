const Peliculas = require("../models/Pelicula");
const peliculaController = {};

function crearPelicula (req, res, next) {
  Peliculas.create(req.body)
    .then(Peliculas => {
      res.send(Peliculas);
    })
    .catch(next);
};

function obtenerPeliculas (req, res) {
  Peliculas.find({}, function (err, Peliculas){
    res.send(Peliculas);
  });
};

function obtenerPelicula (req, res) {
  Peliculas.findById({_id: req.params.id}, function (err, Peliculas){
    res.send(Peliculas);
  });
};

function actualizarPelicula (req, res, next) {
  Peliculas.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      const pelicula = Peliculas.findById({ _id: req.params.id });
      return pelicula;
    })
    .then(pelicula => {
      res.send(pelicula);
    })
    .catch(next);
};

function eliminarPelicula (req, res, next) {
  Peliculas.findByIdAndDelete({ _id: req.params.id })
    .then(pelicula => {
      res.send(pelicula);
    })
    .catch(next);
};

module.exports = {peliculaController, crearPelicula, obtenerPelicula, actualizarPelicula, eliminarPelicula}
