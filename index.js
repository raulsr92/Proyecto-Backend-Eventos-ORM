console.log("Hola Mundo, soy Raúl")

// Importación de paquetes

import express from 'express'
import bodyParser from 'body-parser'
import cors from './config/cors.js'
import PUERTO from './utils/constantes.js'
import api from './routes.js'
import dotenv from 'dotenv';
// Instancias

const app = express();


// Configuraciones y redireccioens

app.use(bodyParser.json());
app.use(cors);
dotenv.config();

//Endpoint principal...

app.use("/api/v1", api)

// Inicializar el servidor

app.listen(PUERTO, ()=>{
    console.log("Listening on "+ PUERTO)
})


/*
// GET Request

app.get( "/eventos", (req, res) =>{

    res.send(arrEventoJson.arreglo)

} );


app.get( "/eventos/:id", function(req, res){

    console.log(`Accediendo al elemento en la posición: ${req.params.id}`);

    res.send(arrEventoJson.arreglo[req.params.id])
})


// POST Request

app.post("/eventos", function (req,res) {

    const objEvento = req.body

    res.send(objEvento)

    console.log(objEvento)

    // Agregar a array

    arrEventoJson.arreglo.push(objEvento)

})

*/


