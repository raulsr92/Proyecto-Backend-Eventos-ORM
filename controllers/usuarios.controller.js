// Importación de paquetes y archivos

import * as susuarios from '../services/usuarios.service.js'

// Funciones exportables

//  Método getAll

export const getAll = async function (req, res) {
    console.log("------------controller------------");

    try {
        const usuarios = await susuarios.getAll();
        console.log("....despues de susuarios.getAll()");
        res.json(usuarios || []);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo registros" });
    }
};

// Método getById

export const getById = async function (req, res) {
    console.log("------------controller------------");

    try {
        const objUsuarios = await susuarios.getById(req.params.id);
        console.log("....despues de susuarios.getById()");
        res.json(objUsuarios || []);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo registros" });
    }
};

//  Método create

export const create = async function (req, res) {
    const objUser = req.body;
    console.log(objUser);

    try {
        const idUsuario = await susuarios.create(objUser);
        console.log("....despues de susuarios.create()");
        res.json({ "Id de usuario creado en BD": idUsuario });
    } catch (err) {
        res.status(500).json({ error: "Error ingresando registros" });
    }
};

// Método update

export const update = async function (req, res) {
    const objUser = req.body;
    console.log(objUser);

    try {
        const NumRegistros = await susuarios.update(req.params.id, objUser);
        console.log("....despues de susuarios.update()");
        res.json({ "NumeroRegistrosModificados": NumRegistros });
    } catch (err) {
        res.status(500).json({ error: "Error actualizando registros" });
    }
};

// Método delete

export const deleteRow = async function (req, res) {
    try {
        const NumRegistros = await susuarios.deleteRow(req.params.id);
        console.log("....despues de susuarios.deleteRow()");
        res.json({ "NumeroRegistrosModificados": NumRegistros });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando registros" });
    }
};