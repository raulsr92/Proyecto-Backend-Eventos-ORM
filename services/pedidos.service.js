
//Importar pool de conexiones

import pool from '../config/db.js'

// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = function () {
 
    console.log("----------------------Service--------------------")
    
    return new Promise( (resolve, reject) =>{
        pool.query( 'select P.id_pedido,U.nom_usuario,U.correo_usuario,P.fecha_pedido,P.monto_total_pedido,MP.nombre_mediopago,E.Nombre_Evento from tb_pedido P inner join tb_usuario U on P.id_usuario = U.id_usuario inner join tb_evento E on P.Id_Evento = E.Id_Evento inner join tb_mediopago MP on MP.id_mediopago = P.id_mediopago',
                    (err, results, fields)=>{
            console.log(results);
            if(err){
                reject(err)
            } else{
                resolve(results)
            }
        })
    }
    )
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = function (Id_Pedido) {
 
    console.log("----------------------Service Listar por ID--------------------")
    
    return new Promise( (resolve, reject) =>{
        pool.query( 'select P.id_pedido,U.nom_usuario,U.correo_usuario,P.fecha_pedido,P.monto_total_pedido,MP.nombre_mediopago,E.Nombre_Evento from tb_pedido P inner join tb_usuario U on P.id_usuario = U.id_usuario inner join tb_evento E on P.Id_Evento = E.Id_Evento inner join tb_mediopago MP on MP.id_mediopago = P.id_mediopago where id_pedido = ?',
                    [Id_Pedido],(err, results, fields)=>{
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

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = function (objPedido) {
 
    console.log("----------------------Service Insertar nuevo Pedido--------------------")
    
    return new Promise( (resolve, reject) =>{
        pool.query( 'INSERT INTO tb_pedido  (fecha_pedido,monto_total_pedido,id_mediopago, id_usuario, Id_Evento ) VALUES (now(),?,?,?,?)',
                    [objPedido.monto_total_pedido, objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento],(err, results, fields)=>{
            console.log(results);
            if(err){
                reject(err)
            } else{
                resolve(results.insertId)
            }
        })
    }
    )
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = function (Id_Pedido, objPedido) {
 
    console.log("----------------------Service Modificar Pedido--------------------")
    
    return new Promise( (resolve, reject) =>{
        pool.query( 'update tb_pedido set monto_total_pedido = ?, id_mediopago= ?, id_usuario=?, Id_Evento = ? where id_pedido = ?',
                    [objPedido.monto_total_pedido,objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento,Id_Pedido],(err, results, fields)=>{
            console.log(results);
            if(err){
                reject(err)
            } else{
                resolve(results.affectedRows)
            }
        })
    }
    )
}

