
//Importar pool de conexiones

import pool from '../config/db.js'

//Importar el modelo de Pedidos (sequelize)

import * as modelPedido from '../models/pedido.model.js';


// Crear funciones

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {

    console.log("----------------------Service--------------------")

    //Llamado al método getAll del modelo de pedidos

    const results = await modelPedido.getAll();

    console.log(`Resultados de servico GETALL pedidos`);
    console.log(results);
    return results

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Pedido) {
 
    console.log("----------------------Service Listar por ID pedidos--------------------")
    
    //Llamado al método getById del modelo de pedidos

    const pedido = await modelPedido.getById(Id_Pedido);

    console.log(`Resultados de servico GETBYID pedidos`);
    console.log(`Id solicitado: ${Id_Pedido}`);
    console.log(`Pedido: `);
    console.log(pedido);
    return pedido[0]
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objPedido) {
 
    
    console.log("----------------------Service Insertar nuevo Pedido--------------------")
    
    //Llamado al método getById del modelo de pedidos

    let idPedidoCreado = await modelPedido.create(objPedido);

             
    console.log(`Resultados de servico CREATE pedidos`);
    console.log(`Obteniendo ID generado:`);
    console.log(idPedidoCreado);

    return idPedidoCreado;
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Pedido, objPedido) {
 
    console.log("----------------------Service Modificar Pedido--------------------")

    let NumPedidosModificados = await modelPedido.update(Id_Pedido,objPedido);

    console.log(`Resultados de servico UPDATE pedidos`);
    console.log(`Obteniendo n° filas afectadas:`);
    console.log(NumPedidosModificados);

    return NumPedidosModificados;
}

