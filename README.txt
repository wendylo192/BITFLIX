Para inicializar el proyecto preferiblemente ubicarlo en una carpeta en C:

La base de datos esta en MongoDB, se recomienda antes de realizar cualquier prueba con el registro o el login abrir los .exe de mongod.exe y mongo.exe

con cygwin ir hasta la ruta en donde se encuentre el proyecto e ingresar lo siguiente para crear la carpeta de node_modules

npm install

npm install -g nodemon

despues de instalar los modulos, para inicializar el servicio se ingresa en cygwin 

nodemon src/index

con esto se inicializa el servidor en el puerto 3002

para verificarlo ingresar a la siguiente ruta http://localhost:3002/ (la pagina de inicio que tiene es un ejemplo) 

Las siguientes rutas son las del registro y el login 

http://localhost:3002/users/signup
http://localhost:3002/users/signin


