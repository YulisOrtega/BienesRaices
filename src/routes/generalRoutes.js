import express from 'express' //EMCS6
import helmet from 'helmet';

const router = express.Router();
router.get('/', (request, response) => response.render("./layout/index.pug", {page:"Home"}))


router.get('/quienEres', (request, response) => response.send("Soy tu primera App Web en una arquitectura SOA (Service Object Oriented)."))
router.get('/queUsas', (request, response) => response.send("Estoy construida en el lenguaje de programación JavaScript, y utilizo el microservidor de Express."))
router.get('/misDatos', (request, response) => response.json({nombre: "Yulissa Ortega Cuevas", fechaNacimiento: "2004-05-26", matricula: "220875"}))

//Rutas a través de POST
router.post('/', (request, response) => response.send("Hi web from POST verb."))
//Rutas a través de PUT
router.put('/', (request, response) => response.send("You're trying to update some properties of data using PUT."))
//Rutas a través de PATCH
router.patch('/', (request, response) => response.send("Hi, you're trying to update all data object through PATCH."))
//Rutas a través de delete 
router.delete('/', (request, response) => response.send("Are you sure that you want to DELETE Data?."))




export default router