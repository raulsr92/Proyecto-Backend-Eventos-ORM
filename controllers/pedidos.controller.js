
import * as spedidos from '../services/pedidos.service.js'

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function (req, res) {

    console.log("------------controller getAll pedidos------------");

    try {
        let pedidos = await spedidos.getAll();
        console.log("....despues de spedidos.getAll()");
        res.json(pedidos || [] )

    } catch (error) {
        res.status(500).json({"error":"Error obteniendo registros"});
    }

}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById =async function (req, res) {
    console.log("------------controller getById pedidos------------");

    try {
        let pedido = await spedidos.getById(req.params.id);
        console.log("....despues de spedidos.getById()");
        res.json(pedido || [] )

    } catch (error) {
        res.status(500).json({"error":"Error obteniendo registros"});
    }

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create =async function(req, res){

    console.log("------------controller create pedidos------------");

    try {
        
        const objPedido = req.body
        console.log(`Pedido a ingresar:`);
        console.log(objPedido)

        let idPedidoCreado=await spedidos.create(objPedido)
        console.log("....despues de spedidos.create()");
        res.json({"Id de Pedido generado":idPedidoCreado});

    } catch (error) {
        res.status(500).json({"error":"Error ingresando registros"});
    }

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function(req, res){

        console.log("------------controller update pedidos------------");

    try {
        
        const objPedido = req.body
        console.log(`Pedido a modificar:`);
        console.log(objPedido)

        let NumPedidosModificados=await spedidos.update(req.params.id,objPedido)
        console.log("....despues de spedidos.update()");
        res.json({"N° registros modificados":NumPedidosModificados});

    } catch (error) {
        res.status(500).json({"error":"Error ingresando registros"});
    }

}

