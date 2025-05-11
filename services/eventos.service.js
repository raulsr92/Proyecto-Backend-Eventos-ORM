
//Importar pool de conexiones
import pool from '../config/db.js'

//Importar el modelo de eventos (sequelize)
import * as modelEvento from '../models/evento.model.js'

// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Service--------------------")

    //Llamado al método getAll del modelo de eventos
    
    const results = await modelEvento.getAll();

    console.log(`Resultados en servicio:`)
    console.log(results);
    return results;
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Evento) {
 
    console.log("----------------------Service para Listar por ID--------------------")
    
    const [results, fields] = await pool.query( 
        `select E.Id_Evento,E.Nombre_Evento, 
                E.Fecha_Evento,C.Nom_Categoria, L.Nom_Local, L.Capacidad_Local 
         from tb_evento E 
         inner join tb_categoria C 
         on E.Id_Cate = C.Id_Cate 
         inner join tb_local L 
         on E.Id_Local = L.Id_Local 
         where E.Id_Evento=?  order by E.Id_Evento`,[Id_Evento])

    console.log(results);
    return results[0];
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objEvento) {
 
    console.log("----------------------Service Insertar nuevo Evento--------------------")
    
    const [results, fields] = await pool.query( 
            `INSERT INTO tb_evento (Nombre_Evento,Fecha_Evento,Hora_Evento, Id_Cate, Id_Local) 
            VALUES (?, ?,?, ?,?)`,
            [objEvento.Nombre_Evento, objEvento.Fecha_Evento,objEvento.Hora_Evento,
             objEvento.Id_Cate,objEvento.Id_Local])

            console.log(results);
            return results.insertId;
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Evento, objEvento) {
 
    console.log("----------------------Service Modificar Evento--------------------")
    
    const [results, fields] = await pool.query( 
            `update tb_evento 
             set Nombre_Evento = ?, Fecha_Evento = ?, Hora_Evento=?,Id_Cate =?,Id_Local=?,Activo=? 
             where Id_Evento = ?`,
            [objEvento.Nombre_Evento, objEvento.Fecha_Evento,
             objEvento.Hora_Evento,objEvento.Id_Cate,objEvento.Id_Local,objEvento.Activo,
             Id_Evento]) 
       
        console.log(results);
        return results.affectedRows;      
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete

export const deleteRow = async function (activo,Id_Evento) {
 
    console.log("----------------------Service Delete (modificar activo false) Evento--------------------")
    
    const [results, fields] = await pool.query(
            `update tb_evento set Activo=?  where Id_Evento = ?`,
                    [activo,Id_Evento])
        
        console.log(results);
        return results.affectedRows; 
}