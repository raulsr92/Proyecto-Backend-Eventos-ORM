//Importar pool de conexiones

import pool from '../config/db.js'

// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método Logueo

export const logueo = function (objLogin) {
 
    console.log("----------------------Servicio de Logueo--------------------")
    
    return new Promise( (resolve, reject) =>{
        pool.query( 'select * from tb_usuario where correo_usuario = ? and pass_usuario = ? and fingreso_usuario = 1',
                    [objLogin.correo_usuario,objLogin.pass_usuario],(err, results, fields)=>{
            console.log(results);
            if(err){
                reject(err)
            } else{
                resolve(results[0])
            }
        })
    }
    )
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método Login

export const login = function (objUsuario) {
    console.log("----------------------Servicio de Login--------------------")
    return new Promise ((resolve, reject)=>{
        pool.query( 
            `
                select 
	                id_usuario,nom_usuario,correo_usuario,pass_usuario,rol_usuario,
	                case 
		                when Activo = 1 then 'Usuario Activo'
		                when Activo = 0 then 'Usuario Inactivo'
	                end as Activo
                from
                tb_usuario
                where correo_usuario=? and fingreso_usuario=1
            `
            ,[objUsuario.correo_usuario]
            ,(err, results,fields)=>
            {
                console.log(results);
                if(err){
                    reject(err)
                } else{
                    resolve(results)
                }
            })
    })
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método Fin user by ID

export const findUserById = function (id_usuario) {
    console.log("----------------------Servicio de Login--------------------")
    return new Promise ((resolve, reject)=>{
        pool.query( 
            `
                select 
	                id_usuario,nom_usuario,correo_usuario,pass_usuario,rol_usuario,
	                case 
		                when Activo = 1 then 'Usuario Activo'
		                when Activo = 0 then 'Usuario Inactivo'
	                end as Activo
                from tb_usuario  where id_usuario=? and fingreso_usuario=1
            `
            ,[id_usuario]
            ,(err, results,fields)=>
            {
                console.log(results);
                if(err){
                    reject(err)
                } else{
                    resolve(results)
                }
            })
    })
}
