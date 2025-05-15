//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Importación de módulos
import { Sequelize,DataTypes, } from 'sequelize';

//Definiendo modelo "Usuario"

export const Usuario = orm.define('tb_usuario',
    {
        id_usuario:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        nom_usuario:{
            type: DataTypes.STRING(150),
            allowNull: false,
            //Establecer longitud
            validate: {
                len: [1, 150],
            }   
        },
        ape_usuario:{
            type: DataTypes.STRING(180),
            allowNull: false,
            //Establecer longitud
            validate: {
                len: [1, 180],
            }   
        },
        correo_usuario:{
            type: DataTypes.STRING(120),
            allowNull: false,
            unique:true,
            validate:{
                isEmail: true,
            }

        },
        pass_usuario:{
            type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                min:8,
                len: [8, 20],
                is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ // Al menos una mayúscula, una minúscula, un número y un caracter especial
            }
        },
        tipo_doc_usuario:{
            type: DataTypes.STRING(100),
            allowNull:false,
            isIn: [['DNI', 'Pasaporte','Carnet de Extranjería' ]],  
        },
        nro_doc_usuario:{
            type: DataTypes.STRING(12),
            allowNull:false,
            validate:{
                isNumeric:true,
                len: [8, 12]
            }
        },   
        pais_usuario:{
            type: DataTypes.STRING(100),
            allowNull:false,
        }, 
        ubigeo:{
            type: DataTypes.STRING(6),
            allowNull: false,
            validate: {
                len: [6, 6],
                is: /^[0-9]{6}$/
            },
        }, 
        cod_telef_usuario:{
            type: DataTypes.STRING(50),
            allowNull: false
        }, 
        telef_usuario:{
            type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                isNumeric:true,
                len: [7, 20]
            }
        },  
        fingreso_usuario:{
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            validate:{
                isIn: [[0,1]]
            }
        },  
        num_errores_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate:{
                min:0,
                isInt:true
            }

        },  
        otp_usuario:{
            type: DataTypes.STRING(20),
        },  
        Activo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate:{
                isIn: [[0, 1]]
            }
        },   
        rol_usuario:{
            type: DataTypes.STRING(60),
            allowNull: false,
            validate:{
                isIn: [['administrador', 'user','backend','frontend']],  
                min:60
            }
        },     
    },
    {
        //Options
        freezeTableName: true,
        tableName: 'tb_usuario',
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
 
    console.log("----------------------Model Getting all usuers--------------------")

    const users =  await Usuario.findAll(
        {
            //Campos que quiero mostrar de la tabla Usuarios
            attributes: ['id_usuario','nom_usuario','ape_usuario','correo_usuario',
                'cod_telef_usuario','telef_usuario','rol_usuario',
                [Sequelize.literal(
                    `CASE 
                        WHEN Activo = 1 THEN 'Usuario Activo' 
                        WHEN Activo = 0 THEN 'Usuario Inactivo' 
                    END`
                ),'Activo']
            ],
        }
    )
    console.log(`Resultados en modelo:`)
    console.log(users);
    return users; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Usuario) {
 
    console.log("----------------------Model para Listar por ID--------------------")
    
    const users =  await Usuario.findAll(
        {
            //Campos que quiero mostrar de la tabla Usuarios
            attributes: ['id_usuario','nom_usuario','ape_usuario','correo_usuario',
                'cod_telef_usuario','telef_usuario','rol_usuario',
                [Sequelize.literal(
                    `CASE 
                        WHEN Activo = 1 THEN 'Usuario Activo' 
                        WHEN Activo = 0 THEN 'Usuario Inactivo' 
                    END`
                ),'Activo']
            ],
            where:{
                id_usuario: Id_Usuario
            }
        }
    )
    console.log(`Resultados en modelo:`)
    console.log(users);
    console.log(users[0]);
    return users;  
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objUser) {
 
    console.log("----------------------Modelo Insertar nuevo Usuario--------------------")

    try {
        const user = await Usuario.create(
            {
                nom_usuario:objUser.nom_usuario,
                ape_usuario:objUser.ape_usuario,
                correo_usuario:objUser.correo_usuario,
                pass_usuario:objUser.pass_usuario,
                tipo_doc_usuario:objUser.tipo_doc_usuario,
                nro_doc_usuario: objUser.nro_doc_usuario,
                pais_usuario:objUser.pais_usuario,
                ubigeo: objUser.ubigeo,
                cod_telef_usuario: objUser.cod_telef_usuario,
                telef_usuario:objUser.telef_usuario,
                rol_usuario:objUser.rol_usuario
            }
        )
            console.log(`Resultados en modelo:`)
            console.log(user);
            console.log(`ID de Usuario creado:`)
            console.log(user.toJSON().id_usuario);
            return user.toJSON().id_usuario; 
        
    } catch (error) {
        console.error("Error al insertar evento:", error.message);
        throw error;
    }
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (id_usuario, objUser) {
    console.log("----------------------Modelo Modificar Usuario--------------------")
        try {
            const [updatedRows] = await Usuario.update(
                {
                    nom_usuario:objUser.nom_usuario,
                    ape_usuario:objUser.ape_usuario,
                    correo_usuario:objUser.correo_usuario,
                    pass_usuario:objUser.pass_usuario,
                    ubigeo: objUser.ubigeo,
                    telef_usuario:objUser.telef_usuario,
                    rol_usuario:objUser.rol_usuario         
                },
                {
                    where:{
                        id_usuario: id_usuario
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

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete

export const deleteRow = async function (Id_Usuario) {
 
    console.log("----------------------Service Desactivar usuario--------------------")


            try {
            const [updatedRows] = await Usuario.update(
                {
                    Activo:0,
                },
                {
                    where:{
                        id_usuario: Id_Usuario
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