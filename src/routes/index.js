const express = require('express');
const router = express.Router();

/*----------------Rutas Nav----------------------*/ 
router.get('/', (req, res) => {
    res.render('index', {title : 'EPS Vikiria | Home'});
});



/*----------------Rutas Fitoterapia----------------------*/ 
router.get('/fitoterapia', (req, res) => {
    res.render('fitoterapia', {title : ' EPS Vikiria | Fitoterapia'})
});
router.get('/valeriana', (req, res) => {
    res.render('plantas_fitoterapia/plantaUno', {title : ' EPS Vikiria | Fitoterapia-valeriana'})
});
router.get('/ginseng', (req, res) => {
    res.render('plantas_fitoterapia/plantaDos', {title : ' EPS Vikiria | Fitoterapia-Ginseng'})
});
router.get('/aloevera', (req, res) => {
    res.render('plantas_fitoterapia/plantaTres', {title : ' EPS Vikiria | Fitoterapia-Aloe Vera'})
});

/*----------------Rutas Fitoterapia----------------------*/ 

/*----------------Rutas Servicios----------------------*/

router.get('/servicios', (req, res) => {
    res.render('servicios', {title : 'EPS Vikiria | Servicios'});
});



/*----------------Rutas Servicios ----------------------*/ 
/*----------------Rutas Nav----------------------*/ 

/*----------------Rutas Footer----------------------*/ 
router.get('/nuestraeps', (req, res) => {
    res.render('info_eps/neps', {title : 'Nuestra EPS '})
});

router.get('/informate', (req, res) => {
    res.render('info_eps/newseps', {title : 'EPS Vikiria | Noticias '})
});

router.get('/promyprev', (req, res) => {
    res.render('info_eps/propreeps', {title : 'EPS Vikiria | Promoción y Prevención'})
});

router.get('/legislacion', (req, res) => {
    res.render('info_eps/legiseps', {title : 'EPS Vikiria | Legislación'})
});

router.get('/atencion', (req, res) => {
    res.render('info_eps/attneps', {title : 'EPS Vikiria | Afiliación y Tramites'})
});

/*----------------Rutas Footer----------------------*/
module.exports = router