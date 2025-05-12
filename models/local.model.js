//Importación de módulos
import { Sequelize,DataTypes, or } from 'sequelize';

//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Definiendo modelo "Local"

export const Local = orm.define('tb_local',
    {
        Id_Local:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        Nom_Local:{
            type: DataTypes.STRING(150),
            allowNull: false,
            //Establecer longitud
            validate: {
                len: [1, 150],
            }            

        },
        Ubigeo:{
            type: DataTypes.STRING(6),
            allowNull: false,
            validate: {
                len: [6, 6],
                is: /^[0-9]{6}$/
            },
        },
        Direc_Local:{
            type: DataTypes.STRING(150),
            allowNull: false,
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
                isInt: true  
            },
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
    try {
        await orm.authenticate();
        console.log("Conexión establecida");
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

