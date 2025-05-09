// Importación de paquetes y archivos

import * as susuarios from '../services/usuarios.service.js'

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = function (req, res) {

    console.log("------------controller------------");
    susuarios.getAll()
    .then( usuarios =>{
            console.log("....despues de susuarios.getAll()");
            res.json(usuarios || [] )
    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = function (req, res) {
    console.log("------------controller------------");
    susuarios.getById(req.params.id)
    .then( objUsuarios =>{
            console.log("....despues de susuarios.getById()");

            res.json(objUsuarios || [] )
    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = function(req, res){

    const objUser = req.body
    console.log(objUser)
    susuarios.create(objUser)
    .then( idUsuario =>{
        console.log("....despues de susuarios.create()");
        res.json({"Id de usuario creado en BD":idUsuario});
        })
    .catch(
        err => {
        res.status(500).json({"error":"Error ingresando registros"});
    }
)
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = function(req, res){

    const objUser = req.body
    console.log(objUser)
    susuarios.update(req.params.id,objUser)
    .then( NumRegistros =>{
        console.log("....despues de susuarios.update()");
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

    susuarios.deleteRow(req.params.id)
    .then( NumRegistros =>{

        console.log("....despues de susuarios.deleteRow()");
        res.json({"NumeroRegistrosModificados":NumRegistros});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error eliminando registros"});
    }
)
}