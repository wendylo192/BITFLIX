const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser') //Info http://bit.ly/2Iy6hQJ

// Initialition
const app = express();
const cors = require('cors')

require('./database');
require('./config/passport');

app.use(cors())
// Settings

app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs ({
    defaultLayout:'main' ,
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials') ,
   extname: '.hbs' ,
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// Global Variables
app.use((req, res, next) =>{
    res.locals.success_msg =  req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error =  req.flash('error');
    res.locals.user = req.user || null;
    next();

});
// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    
})


/* Avoid CORS error*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({extended:false})) // necesario para que funcione bodyParser
app.use(bodyParser.json()) // Convertir en JSON los datos que llegan por medio de peticiones

