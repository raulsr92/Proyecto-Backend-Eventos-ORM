//Importación de módulos
import { Sequelize,DataTypes, or } from 'sequelize';

//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Definiendo modelo "Local"

export const Marca = orm.define('tb_local',
    {
        Id_Local:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        Nom_Local:{
            type: DataTypes.STRING,
            //Establecer longitud
            validate: {
                len: [1, 150],
            }            

        },
        Ubigeo:{
            type: DataTypes.STRING(6),
            validate: {
                len: [6, 6],
            },
            isNumeric: true  
        },
        Direc_Local:{
            type: DataTypes.STRING,
            validate: {
                len: [1, 150],
            } 
        },
        Capacidad_Local:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
            notNull: {
                msg: 'Se requiere la capacidad del local',
            },
            }
        }
    },
    {
        //Options
        tableName: 'tb_local',
        timestamps: false,
    }
  
)

// f para establecer la conexión a la base de datos

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}