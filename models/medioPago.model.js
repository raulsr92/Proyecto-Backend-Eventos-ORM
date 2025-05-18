//Importación de módulos
import { Sequelize,DataTypes, or } from 'sequelize';

//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Definiendo modelo "Medio Pago"

export const MedioPago = orm.define('tb_mediopago',
    {
        id_mediopago:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        nombre_mediopago:{
            type: DataTypes.STRING(150),
            allowNull: false,
            //Establecer longitud
            validate: {
                len: [1, 150],
            }      
        }
    },
    {
        //Options
        freezeTableName: true,
        tableName: 'tb_mediopago',
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