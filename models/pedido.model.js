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

// Relaciones entre tablas (Associations)

// ============> Entre tabla Pedido y Medio de Pago

MedioPago.hasMany(
    Pedido,
    {
        foreignKey: 'id_mediopago'
    }
);

Pedido.belongsTo(
    MedioPago,
    {
        foreignKey: 'id_mediopago'
    }
)

// ============> Entre tabla Pedido y Usuario

Usuario.hasMany(
    Pedido,
    {
        foreignKey: 'id_usuario'
    }
);

Pedido.belongsTo(
    Usuario,
    {
        foreignKey: 'id_usuario'
    }
)

// ============> Entre tabla Pedido y Evento

Evento.hasMany(
    Pedido,
    {
        foreignKey: 'Id_Evento'
    }
);

Pedido.belongsTo(
    Evento,
    {
        foreignKey: 'Id_Evento'
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

    const results = await Pedido.findAll(
        {
            //Campos que quiero mostrar de la tabla Pedidos
            attributes: ['id_pedido','fecha_pedido','monto_total_pedido'],
            include:
            [
                {
                    model: Usuario,
                    //Campos que quiero mostrar que pertenecen a Usuario
                    attributes:['nom_usuario','correo_usuario']
                },
                {
                    model: Evento,
                    //Campos que quiero mostrar que pertenecen a Evento
                    attributes:['Nombre_Evento']
                },
                                {
                    model: MedioPago,
                    //Campos que quiero mostrar que pertenecen a Medio de Pago
                    attributes:['nombre_mediopago']
                }
                
            ]
                }
    )

    
    return results.map(p=>(
        {
            id_pedido: p.id_pedido,
            nom_usuario: p.tb_usuario.nom_usuario,
            correo_usuario: p.tb_usuario.correo_usuario,
            fecha_pedido: p.fecha_pedido, 
            monto_total_pedido: p.monto_total_pedido,
            nombre_mediopago: p.tb_mediopago.nombre_mediopago,
            Nombre_Evento:p.tb_evento.Nombre_Evento

        }));

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Pedido) {
 
    console.log("----------------------Model Listar por ID pedidos--------------------")
    
    const results = await Pedido.findAll(
        {
            //Campos que quiero mostrar de la tabla Pedidos
            attributes: ['id_pedido','fecha_pedido','monto_total_pedido'],
            include:
            [
                {
                    model: Usuario,
                    //Campos que quiero mostrar que pertenecen a Usuario
                    attributes:['nom_usuario','correo_usuario']
                },
                {
                    model: Evento,
                    //Campos que quiero mostrar que pertenecen a Evento
                    attributes:['Nombre_Evento']
                },
                                {
                    model: MedioPago,
                    //Campos que quiero mostrar que pertenecen a Medio de Pago
                    attributes:['nombre_mediopago']
                }
                
            ],
            where:{
                Id_Pedido: Id_Pedido
            }
        }
    )

    
    return results.map(p=>(
        {
            id_pedido: p.id_pedido,
            nom_usuario: p.tb_usuario.nom_usuario,
            correo_usuario: p.tb_usuario.correo_usuario,
            fecha_pedido: p.fecha_pedido, 
            monto_total_pedido: p.monto_total_pedido,
            nombre_mediopago: p.tb_mediopago.nombre_mediopago,
            Nombre_Evento:p.tb_evento.Nombre_Evento

        }));
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objPedido) {
 
    
    console.log("----------------------Modelo Insertar nuevo Pedido--------------------")

        try {
            const pedido = await Pedido.create(
        {
            monto_total_pedido: objPedido.monto_total_pedido,
            id_mediopago:       objPedido.id_mediopago,
            id_usuario:         objPedido.id_usuario,
            Id_Evento:          objPedido.Id_Evento,
           
        });

        console.log(`Resultados en modelo:`)
        console.log(pedido)
        console.log(`ID de Evento Insertado:`)
        console.log(pedido.toJSON().id_pedido)

        return pedido.toJSON().id_pedido;

    } catch (error) {
        console.error("Error al insertar evento:", error.message);
        throw error;
    }
    

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Pedido, objPedido) {
 
    console.log("----------------------Modelo Modificar Pedido--------------------")

    try {
        const [updatedRows] = await Pedido.update(
            {
            monto_total_pedido: objPedido.monto_total_pedido,
            id_mediopago:       objPedido.id_mediopago,
            id_usuario:         objPedido.id_usuario,
            Id_Evento:          objPedido.Id_Evento,        
            },
            {
                where:{
                    id_pedido: Id_Pedido
                }
            }
        )
        console.log(`Resultados en modelo:`)
        console.log(`Filas afectadas: ${updatedRows}`);
        return updatedRows;        
    } catch (error) {
        console.error("Error al actualizar evento:", error.message);
        throw error;
    }
}
