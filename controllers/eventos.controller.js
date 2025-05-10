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

export const getAll = async function (req, res) {

    console.log("------------controller------------");

    try {
        let eventos = await seventos.getAll();
        console.log("....despues de seventos.getAll()");
        res.json(eventos || [] )

    } catch (error) {
        res.status(500).json({"error":"Error obteniendo registros"});

    }
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById =  async function (req, res) {

    console.log("------------controller getById------------");

    try {
        let objEventos = await seventos.getById(req.params.id);
        console.log("....despues de seventos.getById()");
        res.json(objEventos || [] )

    } catch (error) {
                    res.status(500).json({"error":"Error obteniendo registros"});

    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function(req, res){
    console.log("------------controller create ------------");
    try {
            // Lo que se recibde por parte del usuario:
            const objEvento = req.body
            console.log(`Evento a crear: `)
            console.log(objEvento)

            //Invocamos al servicio crear y guardamos el resultado en una variable (el ID de evento creado)
            let idEventoCreado = await seventos.create(objEvento)
            console.log("....despues de seventos.create()");
            res.json({"IdEvento":idEventoCreado});

    } catch (error) {
        res.status(500).json({"error":"Error ingresando registros"});
    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function(req, res){
    console.log("------------controller update ------------");

    try {
        // Lo que se recibe por parte del usuario:
            const objEvento = req.body
            console.log(`Evento a actualizar: `)
            console.log(objEvento)

        //Invocamos al servicio UPDATE y guardamos el resultado en una variable (el Nro de filas modificadas)

            let NumRegistros = await seventos.update(req.params.id,objEvento);
            console.log("....despues de seventos.update()");
            res.json({"NumeroRegistrosModificados":NumRegistros});

        
    } catch (error) {
        res.status(500).json({"error":"Error actualizando registros"});
    }

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