//Common JS

//Importando la libreria de express para activar la comunicación protocolo HTTTP
//ECM56
import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import usersRouters from './routes/usersRouters.js'
import db from './config/db.js';
import User from './models/User.js';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {homePage} from './controllers/userControllers.js';
dotenv.config({path:"src/.env"})
import propertyRoutes from './routes/propertyRoutes.js';
import Property from './models/Property.js';

 //Instancias el modulo express de la libreria para definir el servidor que atendera las peticiones
 const app = express();
app.use(helmet());

 try {
   await db.authenticate();
   await db.sync();
   console.log("Conexión a la base de datos exitosa");
 } catch (error) {
   console.log(error);
 }

 //Settings
app.set('PORT', process.env.PORT || 3000)
 //Agregar y configurar el TemplateEngine
 app.set('view engine', 'pug')
 app.set('views', './src/views')

//Definimos la carpeta para los recursos publicos
 app.use(express.static('./src/public'))

 //Permitimos la lectura de datos a traves de HTML
 app.use(express.urlencoded({extended: true}))

 app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
      styleSrc: ["'self'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
      connectSrc: ["'self'", 'https://tile-provider-domain.com', 'https://geocode.arcgis.com'],
  },
}));


 //cookie-parser
 app.use(cookieParser())

 app.listen(process.env.SERVER_PORT,(request, response)=>{
    //Le indicamos a la instancia de express que comience a escuchar las peticiones
    console.log(`El servidor web ha sido iniciado...
    \n El servidor esta funcionando en el puerto: ${process.env.SERVER_PORT} `);
 })


//Routing - Controlando las peticiones que se reciben por medio de un endpoint
app.use('/', generalRoutes)
app.use('/login', usersRouters)
app.use('/home',homePage)
app.use('/property', propertyRoutes)




