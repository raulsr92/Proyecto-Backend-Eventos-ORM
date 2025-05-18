
//Importar pool de conexiones

import pool from '../config/db.js'

// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Service getAll pedidos--------------------")
    const [results,fields] = await pool.query(
        `select 
            P.id_pedido,U.nom_usuario,U.correo_usuario,P.fecha_pedido,
            P.monto_total_pedido,MP.nombre_mediopago,E.Nombre_Evento 
        from tb_pedido P 
        inner join tb_usuario U 
         on P.id_usuario = U.id_usuario 
        inner join tb_evento E 
         on P.Id_Evento = E.Id_Evento 
        inner join tb_mediopago MP 
         on MP.id_mediopago = P.id_mediopago`,[])
    
    console.log(`Resultados de servico GETALL pedidos`);
    console.log(results);
    return results

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Pedido) {
 
    console.log("----------------------Service Listar por ID pedidos--------------------")
    

    const [results,fields] = await pool.query(
        `select 
            P.id_pedido,U.nom_usuario,U.correo_usuario,
            P.fecha_pedido,P.monto_total_pedido,
            MP.nombre_mediopago,
            E.Nombre_Evento 
        from tb_pedido P 
        inner join tb_usuario U 
         on P.id_usuario = U.id_usuario 
        inner join tb_evento E 
         on P.Id_Evento = E.Id_Evento 
        inner join tb_mediopago MP
         on MP.id_mediopago = P.id_mediopago 
         where id_pedido = ?`,[Id_Pedido])

    console.log(`Resultados de servico GETBYID pedidos`);
    console.log(`Id solicitado: ${Id_Pedido}`);
    console.log(`Pedido: `);
    console.log(results[0]);
    return results[0]
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objPedido) {
 
    
    console.log("----------------------Service Insertar nuevo Pedido--------------------")
    
    const [results,fields] = await pool.query(
        `INSERT INTO tb_pedido  (fecha_pedido,monto_total_pedido,id_mediopago, id_usuario, Id_Evento ) 
                         VALUES (now(),?,?,?,?)`,
        
        [objPedido.monto_total_pedido, objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento])
             
    console.log(`Resultados de servico CREATE pedidos`);
    console.log(results);
    console.log(`Obteniendo ID generado:`);
    console.log(results.insertId);

    return results.insertId;
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Pedido, objPedido) {
 
    console.log("----------------------Service Modificar Pedido--------------------")

    const [results,fields] = await pool.query( 
        `update tb_pedido 
            set monto_total_pedido = ?, id_mediopago= ?, id_usuario=?, Id_Evento = ? 
        where id_pedido = ?`,
            [objPedido.monto_total_pedido,objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento,Id_Pedido])


    console.log(`Resultados de servico UPDATE pedidos`);
    console.log(results);
    console.log(`Obteniendo n° filas afectadas:`);
    console.log(results.affectedRows);

    return results.affectedRows;
}

