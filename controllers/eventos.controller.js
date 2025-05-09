// Importación de paquetes y archivos

import * as seventos from '../services/eventos.service.js'


// Array de los Eventos

const arrEventoJson={
    "arreglo": [
        {
            "IdEvento" : 3,
            "Fecha" : "2025-10-12",
            "Horario" : "22:30",
            "IdLocal" : 7,
            "IdArtista" : 8,
            "IdCategoria" : 2,
        },
        {
            "IdEvento" : 4,
            "Fecha" : "2025-05-06",
            "Horario" : "20:30",
            "IdLocal" : 10,
            "IdArtista" : 10,
            "IdCategoria" : 2,
        },
        {
            "IdEvento" : 5,
            "Fecha" : "2025-10-06",
            "Horario" : "21:30",
            "IdLocal" : 10,
            "IdArtista" : 9,
            "IdCategoria" : 2,
        },
        {
            "IdEvento" : 7,
            "Fecha" : "2025-10-10",
            "Horario" : "20:30",
            "IdLocal" : 8,
            "IdArtista" : 8,
            "IdCategoria" : 2,
        }
    ]}

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = function (req, res) {

    console.log("------------controller------------");

    seventos.getAll()
    .then( eventos =>{

            console.log("....despues de seventos.getAll()");

            res.json(eventos || [] )

    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )
    /*res.send(arrEventoJson.arreglo)*/
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = function (req, res) {
    console.log("------------controller------------");

    seventos.getById(req.params.id)
    .then( objEventos =>{

            console.log("....despues de seventos.getById()");

            res.json(objEventos || [] )

    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )

    /*res.send(arrEventoJson.arreglo[req.params.id])*/
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = function(req, res){

    const objEvento = req.body
    console.log(`Evento a crear: `)
    console.log(objEvento)
    seventos.create(objEvento)
    .then( idEvento =>{

        console.log("....despues de seventos.create()");
        res.json({"IdEvento":idEvento});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error ingresando registros"});
    }
)

    //arrEventoJson.arreglo.push(objEvento)
    /*res.send(objEvento)*/
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = function(req, res){

    const objEvento = req.body
    console.log(objEvento)
    seventos.update(req.params.id,objEvento)
    .then( NumRegistros =>{

        console.log("....despues de seventos.update()");
        res.json({"NumeroRegistrosModificados":NumRegistros});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error actualizando registros"});
    }
)
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete


export const deleteRow = function(req, res){

    seventos.deleteRow('false',req.params.id)
    .then( NumRegistros =>{

        console.log("....despues de seventos.deleteRow()");
        res.json({"NumeroRegistrosModificados":NumRegistros});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error eliminando registros"});
    }
)
}