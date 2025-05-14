//Importar pool de conexiones

import pool from '../config/db.js'

// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Service Getting all usuers--------------------")
    
    const [results, fields] = await pool.query( 
            `
            select 
	            id_usuario,
	            nom_usuario,
	            ape_usuario,
	            correo_usuario,
	            cod_telef_usuario,
	            telef_usuario,
	        case 
		        when Activo = 1 then 'Usuario Activo'
		        when Activo = 0 then 'Usuario Inactivo'
	        end as Activo

            from tb_usuario
            `)

    console.log(`Resultados en servicio:`)
    console.log(results);
    return results; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Usuario) {
 
    console.log("----------------------Service para Listar por ID--------------------")
    
    const [results, fields] = await pool.query( 
            ` select 
                id_usuario,
                nom_usuario,
                ape_usuario,
                correo_usuario,
                cod_telef_usuario,
                telef_usuario,  
                case 
                    when Activo = 1 then 'Usuario Activo'
                    when Activo = 0 then 'Usuario Inactivo'
                end as Activo
                from
                    tb_usuario where id_usuario = ?      
            
            `,[Id_Usuario])

    console.log(`Resultados en servicio:`)
    console.log(results);
    console.log(results[0]);
    return results[0];  

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objUser) {
 
    console.log("----------------------Service Insertar nuevo Usuario--------------------")

    const [results, fields] = await pool.query( 
            `
            INSERT INTO tb_usuario (nom_usuario, ape_usuario, correo_usuario, pass_usuario, tipo_doc_usuario,nro_doc_usuario, pais_usuario,ubigeo,cod_telef_usuario,telef_usuario,fingreso_usuario,num_errores_usuario,Activo, rol_usuario)
			VALUES (?,?,?,?,?,?,?,?,?,?,1,0,1,?)
            `,[objUser.nom_usuario,objUser.ape_usuario,objUser.correo_usuario,objUser.pass_usuario,objUser.tipo_doc_usuario,objUser.nro_doc_usuario,objUser.pais_usuario,objUser.ubigeo,objUser.cod_telef_usuario,objUser.telef_usuario,objUser.rol_usuario])
            
            console.log(`Resultados en servicio:`)
            console.log(results);

            console.log(`Id de usuario Insertado:`)
            console.log(results.insertId);

            return results.insertId; 
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