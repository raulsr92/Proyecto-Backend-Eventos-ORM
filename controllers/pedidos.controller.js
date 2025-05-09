
import * as spedidos from '../services/pedidos.service.js'

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = function (req, res) {

    console.log("------------controller------------");

    spedidos.getAll()
    .then( pedidos =>{

            console.log("....despues de spedidos.getAll()");

            res.json(pedidos || [] )

    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )
    /*res.send(arrEventoJson.arreglo)*/
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = function (req, res) {
    console.log("------------controller------------");

    spedidos.getById(req.params.id)
    .then( objPedido =>{

            console.log("....despues de spedidos.getById()");

            res.json(objPedido || [] )

    })
    .catch(
        err => {
            res.status(500).json({"error":"Error obteniendo registros"});
        }
    )

    /*res.send(arrEventoJson.arreglo[req.params.id])*/
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = function(req, res){

    const objPedido = req.body
    console.log(objPedido)
    spedidos.create(objPedido)
    .then( idPedido =>{

        console.log("....despues de spedidos.create()");
        res.json({"Id de Pedido generado":idPedido});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error ingresando registros"});
    }
)

    //arrEventoJson.arreglo.push(objEvento)
    /*res.send(objEvento)*/
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = function(req, res){

    const objPedido = req.body
    console.log(objPedido)
    spedidos.update(req.params.id,objPedido)
    .then( NumRegistros =>{

        console.log("....despues de spedidos.update()");
        res.json({"NumeroRegistrosModificados":NumRegistros});

        })
    .catch(
        err => {
        res.status(500).json({"error":"Error actualizando registros"});
    }
)
}

