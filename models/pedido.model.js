//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Importación de módulos
import { Sequelize,DataTypes, or, } from 'sequelize';

//Importación de modelos relacionados (claves foráneas)
import {MedioPago} from './medioPago.model.js';
import {Usuario} from './usuario.model.js';
import {Evento} from './evento.model.js';

//Definiendo modelo "Pedido"

export const Pedido = orm.define('tb_pedido',
    {
        id_pedido:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        fecha_pedido:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate:{
                isDate: true,
            }
        },
        monto_total_pedido:{
            type: DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                isNumeric:true,
                min:0.01,
                notNull: { msg: "El monto total del pedido es obligatorio" }
            }
        },
        id_mediopago:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: true,
                min:1
            },
            references:{
                model: MedioPago,
                key: 'id_mediopago'
            }
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: true,
                min:1
            },
            references:{
                model: Usuario,
                key: 'id_usuario'
            }
        },
        Id_Evento:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: true,
                min:1
            },
            references:{
                model: Evento,
                key: 'Id_Evento'
            }
        }
    },
    {
        freezeTableName: true,
        tableName: 'tb_pedido',
        timestamps: false,
    }
)

// f para establecer la conexión a la base de datos

export const connect = async function() {
    try {
        await orm.authenticate();
        console.log("Conexión establecida");
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Model getAll pedidos--------------------")
    const [results,fields] = await orm.query(
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
    
    console.log(`Resultados de modelo GETALL pedidos`);
    console.log(results);
    return results

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Pedido) {
 
    console.log("----------------------Model Listar por ID pedidos--------------------")
    

    const [results,fields] = await orm.query(
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
         where id_pedido = ?`,
        {
            replacements:[Id_Pedido]
        }
    )
         

    console.log(`Resultados de modelo GETBYID pedidos`);
    console.log(`Id solicitado: ${Id_Pedido}`);
    console.log(`Pedido (solo objeto): `);
    console.log(results[0]);
    console.log(`Pedido (array completo): `);
    console.log(results);
    return results[0]
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objPedido) {
 
    
    console.log("----------------------Modelo Insertar nuevo Pedido--------------------")
    
    const [results,fields] = await orm.query(
        `INSERT INTO tb_pedido  (fecha_pedido,monto_total_pedido,id_mediopago, id_usuario, Id_Evento ) 
                         VALUES (now(),?,?,?,?)`,
        {
            replacements: [objPedido.monto_total_pedido, objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento]
        }
    )
        
             
    console.log(`Resultados de servico CREATE pedidos`);
    console.log(results);
    console.log(`Obteniendo ID generado:`);
    console.log(results);

    return results;
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Pedido, objPedido) {
 
    console.log("----------------------Modelo Modificar Pedido--------------------")

    const [results,fields] = await orm.query( 
        `update tb_pedido 
            set monto_total_pedido = ?, id_mediopago= ?, id_usuario=?, Id_Evento = ? 
        where id_pedido = ?`,
        {
            replacements:[objPedido.monto_total_pedido,objPedido.id_mediopago,objPedido.id_usuario,objPedido.Id_Evento,Id_Pedido]
        }
    )
        

    console.log(`Resultados de modelo:`);
    console.log(results);
    console.log(`Obteniendo n° filas afectadas:`);
    console.log(results.affectedRows);

    return results.affectedRows;
}
