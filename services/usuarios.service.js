// services/usuario.service.js

// Importar pool (si fuera necesario para consultas SQL directas)
import pool from '../config/db.js';

// Importar modelo de Sequelize
import * as modelUsuario from '../models/usuario.model.js';

// Método getAll
export const getAll = async function () {
    console.log("----------------------Service Usuarios - getAll--------------------");
    const results = await modelUsuario.getAll();
    console.log(results);
    return results;
};

// Método getById
export const getById = async function (id_usuario) {
    console.log("----------------------Service Usuarios - getById--------------------");
    const result = await modelUsuario.getById(id_usuario);
    console.log(result);
    return result;
};

// Método create
export const create = async function (objUsuario) {
    console.log("----------------------Service Usuarios - create--------------------");
    const newUsuario = await modelUsuario.create(objUsuario);
    console.log("Usuario creado:", newUsuario);
    return newUsuario;
};

// Método update
export const update = async function (id_usuario, objUsuario) {
    console.log("----------------------Service Usuarios - update--------------------");
    const updatedRows = await modelUsuario.update(id_usuario, objUsuario);
    console.log("Filas actualizadas:", updatedRows);
    return updatedRows;
};

// Método delete (borrado lógico)
export const deleteRow = async function (id_usuario) {
    console.log("----------------------Service Usuarios - delete (lógico)--------------------");
    const updatedRows = await modelUsuario.deletes(id_usuario);
    console.log("Filas modificadas:", updatedRows);
    return updatedRows;
};
