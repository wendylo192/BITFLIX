const express = require("express");
const bodyParser = require('body-parser'), 
router = express.Router();
const peliculaController = require("../controllers/pelicula");
router.use(bodyParser.json());

router.get("/buscarPeliculas", peliculaController.obtenerPelicula);
router.get("/buscarPelicula/:id", peliculaController.obtenerPelicula);
router.post("/crearPelicula", peliculaController.crearPelicula);
router.put("/editarPelicula/:id", peliculaController.actualizarPelicula);
router.delete("/eliminarPelicula/:id", peliculaController.eliminarPelicula);

module.exports = router;