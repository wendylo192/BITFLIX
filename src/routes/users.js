const express = require('express');
const UserController = require('../controllers/user');//cargamos el fichero user.js
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', UserController.loginUser);

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup2', UserController.createUser);
router.post('/users/updateUser', UserController.updateUserReal);

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password, role } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Por favor introducir su nombre' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener almenos 4 caracteres' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Este email ya esta en uso');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password, role });
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        req.flash('success_msg', 'Usuario registrado con exito');
        res.redirect('/users/signin');
    }
});
router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});
module.exports = router;