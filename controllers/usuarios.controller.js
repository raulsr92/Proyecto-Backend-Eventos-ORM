// Importación de paquetes y archivos

import * as susuarios from '../services/usuarios.service.js'

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function (req, res) {

    console.log("------------controller------------");

    try {
        let usuarios = await susuarios.getAll();
        console.log("....despues de susuarios.getAll()");
        res.json(usuarios || [] )

    } catch (error) {
        res.status(500).json({"error":"Error obteniendo usuarios"});
    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (req, res) {
    console.log("------------controller------------");

    try {

        let objUsuario = await susuarios.getById(req.params.id)
        console.log("....despues de susuarios.getById()");
        res.json(objUsuario || [] )
        
    } catch (error) {
        res.status(500).json({"error":"Error obteniendo usuario con ID"});

    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function(req, res){

    console.log("------------controller create ------------");

    try {
        const objUser = req.body
        console.log(`Usuario a crear:`)
        console.log(objUser);

        let idUsuarioCreado = await susuarios.create(objUser);
        console.log("....despues de susuarios.create()");
        res.json({"Id de usuario creado en BD":idUsuarioCreado});

    } catch (error) {
        res.status(500).json({"error":"Error ingresando registros"});
    }

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update =async function(req, res){

    console.log("------------controller update ------------");

    try {
        const objUser = req.body
        console.log(`Usuario a actualizar:`)
        console.log(objUser);

        let NumRegistrosMod = await susuarios.update(req.params.id,objUser);
        console.log("....despues de susuarios.update()");
        res.json({"NumeroRegistrosModificados":NumRegistrosMod});
     
    } catch (error) {
        res.status(500).json({"error":"Error actualizando registros"});
    }

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete


export const deleteRow = async function(req, res){

    console.log("------------controller update(delete) ------------");

    try {

        let NumRegistrosMod = await susuarios.deleteRow(req.params.id);
        console.log("....despues de susuarios.deleteRow()");
        res.json({"NumeroRegistrosModificados":NumRegistrosMod});
     
    } catch (error) {
        res.status(500).json({"error":"Error desactivando usuario"});
    }
}