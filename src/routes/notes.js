const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note')
});


router.post('/notes/new-note',isAuthenticated, async (req, res) => {
    const {title, description, hour} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Por favor elige una especialidad'});
    }

    if(!description) {
        errors.push({text: 'Por favor escribe un telefono de contacto'});
    }
    if(!hour) {
        errors.push({text: 'Por favor selecciona una hora de cita'});
    }

    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description,
            hour
        });
    } else {
        const newNote = new Note({title,description,hour});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg','Cita agendada exitosamente, Si no puede asistir por favor borre su cita');
       res.redirect('/notes');
        
    }
});



router.get('/notes', isAuthenticated, async (req, res) => {
   const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
   res.render('notes/all-notes', {notes})
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req,res) =>{

    const {title, description, hour} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description, hour});
    req.flash('success_msg', 'Note Update SuccessFully');
    res.redirect('/notes')
});

router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Cita cancelada satisfactoriamente, puede agendar nueva cita si lo desea')
    res.redirect('/notes')
    
});

module.exports = router;
