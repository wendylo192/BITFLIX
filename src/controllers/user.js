
// CONTROLADOR DE USUARIO
const fs = require('fs');//file system
const path = require('path');//rutas de sistema
const bcrypt = require('bcryptjs'); //modulo para encriptar contraseña
const User = require('../models/User'); //esquema de usuario



// Recibe una petición y una respuesta
function pruebas(req, res) {
    res.status(200).send({
        message: "Probando una acción del controlador de usuarios del API REST con node y Mongo"
    })
}

//Para poder exportar todos los metodos que realicemos 
// y usarlos, Multiple exportación de modulos. Si tenemos más
// Los ponemos aquí como un objeto JSON.


// METODO PARA CREAR NUEVO USUARIO
//  saveUser es el metodo que nos va a permitir crear un nuevo usuario
function saveUser(req, res) {
    var user = new User(); //creamos un objeto usuario, ahora tenemos una instancia del modelo usuario
    // ahora podemos darle un valor a cada una de sus variables

    //recogemos los parametros que vamos a recibir por POST
    var params = req.body; //Recolecta datos/variables que llegan por post

    console.log(params); //para ver que nos llega por la petición.

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; //Usuario normal
    //user.role = 'ROLE_ADMIN'; //Usuario administrador
    user.image = 'null';

    // vamos a encriptar la contraseña

    if (params.password) {
        // encriptar contraseña y guardar datos
        // Llamamos a la var bcrypt y utilizamos su metodo .hash para encriptar
        // null, null son parametros de bcrypt para hacer el encript y le pasamos una callback
        // hash es el dato encriptado
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash //le pasamos a la propiedad password el valor de la encriptación

            // condicional if para validar si el campo clave esta vacio
            if (user.name != null && user.surname != null && user.email != null) {
                // Se guarda el usuario
                // Ahora vamos a guardar los datos en DB con el metodo save de mongoose
                user.save((err, userStored) => { //guardamos el nuevo documento en la DB 'agregar a la colección que tenemos'
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' })
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' })
                        } else {
                            res.status(200).send({ user: userStored })
                        }
                    }
                })
            } else {
                res.status(200).send({ message: 'Rellena todos los campos' })
            }
        });
    } else {
        res.status(500).send({ message: 'introduce la contraseña' }) //Si el usuario no introdujo contraseña
    }


}


//  METODO PARA EL LOGIN
function loginUser(req, res) {

    var params = req.body;

    console.log("************** PARAMETROS INICIO *****************")
    console.log(params)
    console.log("************** PARAMETROS FIN *****************")

    var email = params.email;
    var password = params.password;


    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.send({ message: 'Error en la petición' });
        } else {
            if (!user) {
                res.send({ message: 'El usuario no existe' });
            } else {
                // Comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) { // Obtenemos el token de usuario de JWT
                            // JWT (Jason Web Tokens) con el le asignamos un hash/token al objeto usuario
                            // para tener dentro de un token todos los datos del usuario
                            // Devolver los datos del usuario logueado
                            res.send({id: user.id, name: user.name, email: user.email, role: user.role});

                        } else { //Sino devuelve hash es porque el usuario esta logueado
                            res.send({ user }) //el objeto que hemos creado va a esta guardado dentro de esa propiedad user
                        }

                    } else {
                        res.send({ message: 'El usuario y/o contraseña incorrecto' })
                    }
                })
            }
        }
    })
}


// METODO PARA ACTUALIZAR USUARIO

function updateUser(req, res) {
    var userId = req.params.id; //el id del usuario nos va a llegar como parametro en la URL
    var update = req.body; //utilizando los datos que nos llegan por el metodo PUT

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        // Este metodo encuentra los datos 
        // de un usuario según su id y lo actualiza
        // userId es nuestro objeto en DB
        // update es el objeto  con los datos que deseamos actualizar
        // userUpdated es cuando los datos se actualizaron correctamente

        if (err) { //si ocurre un error con el servidor
            res.status(500).send({ message: 'No se ha podido actualizar el usuario' }); 
            //Error 500 es un error en el servidor
        } else {
            if (!userUpdated) { // si el usuario no pudo ser actualizado correctamente
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else { 
                //si los datos llegaron correctamente, que devuelve el usuario que ha actualizado
                res.status(200).send({ user: userUpdated });
            }
        }
    });

}

// METODO PARA SUBIR IMG DE USUARIO

function uploadImage(req, res) {
    var userId = req.params.id;//Estamos recogiendo el dato de la URL
    var file_name = 'No subido...'; //nombre del fichero, sino viene nada responde el valor 'no subido...'

    if (req.files) { //Gracias a connect-multiplarty podemos utilizar las variables globales 'files'
        // Si llega un archivo se sube 
        var file_path = req.files.image.path; //Almacenamos en una variables la ruta de la img que vamos a cargar
        // image es el nombre del archivo que se va a a cargar

        //Con esta linea vamos a recortar el path/ruta de la imagen para que tome solo el nombre
        // split es un metodo de JS para modificar strings
        var file_split = file_path.split('\\') //recortar el string desde las barras, se crea un array del string

        //Recogemos el dato de split y lo ponemos en la posición 2
        var file_name = file_split[2];

        //Podemos recoger la extensión del archivo con

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        // Validando si la extensión del archivo es correcta 
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ) {
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) =>{
                if (!userUpdated) { // si el usuario no pudo ser actualizado correctamente
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else { 
                    //si los datos llegaron correctamente, que devuelve el usuario que ha actualizado
                    res.status(200).send({ user: userUpdated });
                }
            });
        }else {
            res.status(200).send({ message: 'La extensión de archivo no es valida' })
        }


        /* console.log(file_split); */
        console.log(ext_split);
        console.log(file_path); //para probarlo 


    } else { //sino llega archivo de responde mensaje de : 
        res.status(200).send({ message: 'No has subido ninguna imagen...' })
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

   
        if(fs.existsSync(path_file)){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe la imagen...'})
        }
    
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};





































