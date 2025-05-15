//Importar pool de conexiones
import pool from '../config/db.js'

//Importar el modelo de usuarios (sequelize)

import * as modelUsuario from '../models/usuario.model.js'



// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Service Getting all usuers--------------------")
    
    const results = await modelUsuario.getAll();
    
    console.log(`Resultados en servicio:`)
    console.log(results);
    return results; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Usuario) {
 
    console.log("----------------------Service para Listar por ID--------------------")
    
    const results = await modelUsuario.getById(Id_Usuario)

    console.log(`Resultados en servicio:`)
    console.log(results);
    console.log(results[0]);
    return results[0];  

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objUser) {
 
    console.log("----------------------Service Insertar nuevo Usuario--------------------")

    let idUsuarioCreado = await modelUsuario.create(objUser);

    console.log(`Id de usuario Insertado:`)
    console.log(idUsuarioCreado);

    return idUsuarioCreado; 
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (id_usuario, objUser) {
 
    console.log("----------------------Service Modificar Usuario--------------------")
    
    const [results, fields] = await pool.query(
            `
            update tb_usuario set nom_usuario = ?, ape_usuario = ? ,correo_usuario= ?, pass_usuario=?, ubigeo=?, telef_usuario=?, rol_usuario=? where  id_usuario = ?;
            `
            ,
            [objUser.nom_usuario,objUser.ape_usuario,objUser.correo_usuario,objUser.pass_usuario,
             objUser.ubigeo,objUser.telef_usuario,objUser.rol_usuario,id_usuario])

            console.log(`Resultados en servicio:`)
            console.log(results);

            console.log(`Id de filas modificadas:`)
            console.log(results.affectedRows);

            return results.affectedRows; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete

export const deleteRow = async function (Id_Usuario) {
 
    console.log("----------------------Service Desactivar usuario--------------------")
    
    const [results, fields] = await pool.query(
         'update tb_usuario set Activo=0  where id_usuario = ?',
                    [Id_Usuario])

    console.log(`Resultados en servicio:`)
    console.log(results);

    console.log(`Id de filas modificadas:`)
    console.log(results.affectedRows);

    return results.affectedRows;            
}