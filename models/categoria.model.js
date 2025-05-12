//Importación de módulos
import { Sequelize,DataTypes, or } from 'sequelize';

//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'


//Definiendo modelo "Categoria"

export const Categoria = orm.define('tb_categoria',
    {
        Id_Cate:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        Nom_Categoria:{
            type: DataTypes.STRING(100),
            allowNull: false,
            //Establecer longitud
            validate: {
                len: [1, 100], // Asegura que tenga entre 1 y 100 caracteres
                notNull: {
                    msg: 'Se requiere un nombre de Categoría',
                },
            }    
        }
    },
    {
        //Options
        tableName: 'tb_categoria',
        freezeTableName: true,
        timestamps: false
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
