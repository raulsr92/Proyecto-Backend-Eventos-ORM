//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'

//Importación de módulos
import { Sequelize,DataTypes, where } from 'sequelize';

//Importación de modelos relacionados (claves foráneas)

import { Local } from './local.model.js';
import { Categoria } from './categoria.model.js';


//Definiendo modelo "Evento"

export const Evento = orm.define('tb_evento',
    {
        Id_Evento:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        Nombre_Evento:{
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [1, 200] // Asegura que tenga entre 1 y 200 caracteres
                }
        },
        Fecha_Evento:{
            type: DataTypes.DATE,
            validate:{
                isDate: true,
                isAfter: new Date().toISOString().split('T')[0] // Asegura que sea una fecha en el futuro
            }
        },
        Hora_Evento:{
            type: DataTypes.TIME,
        },
        Id_Cate:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: true,
                min:1
            },
            references:{
                model: Categoria,
                key: 'Id_Cate'
            }
        },
        Id_Local:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: true,
                min:1
            },
            references:{
                model: Local,
                key: 'Id_Local'
            }
        },
        Activo:{
            type: DataTypes.STRING(5),
            defaultValue: 'true',
            validate:{
                isIn: [['true', 'false']]
            },
            get() { // Convierte el valor a booleano al leerlo
                return this.getDataValue('Activo') === 'true';
            },
             set(value) { // Convierte booleanos a string al guardarlos
                this.setDataValue('Activo', value ? 'true' : 'false');
            }
        }
    },
    {
        //Options
        freezeTableName: true,
        tableName: 'tb_evento',
        timestamps: false,
    })

// Relaciones entre tablas (Associations)

// ============> Entre tabla Evento y Local

Local.hasMany(
    Evento,
    {
        foreignKey: 'Id_Local'
    }
);

Evento.belongsTo(
    Local,
    {
        foreignKey: 'Id_Local'
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

// ============> Entre tabla Evento y Categoría

Categoria.hasMany(
    Evento,
    {
        foreignKey: 'Id_Cate'
    }
);

Evento.belongsTo(
    Categoria,
    {
        foreignKey: 'Id_Cate'
    }
)

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Model--------------------")
    
    const results = await Evento.findAll(
        {
            //Campos que quiero mostrar de la tabla Eventos
            attributes: ['Id_Evento','Nombre_Evento','Fecha_Evento'],
            include:
            [
                {
                    model: Categoria,
                    //Campos que quiero mostrar que pertenecen a Categoria
                    attributes:['Nom_Categoria']
                },
                {
                    model: Local,
                    //Campos que quiero mostrar que pertenecen a Local
                    attributes:['Nom_Local','Capacidad_Local']
                }

            ],
            order: [['Id_Evento', 'ASC']] 
        }
    )


    console.log(`Resultados en modelo:`)
  /*  console.log(results);*/
    return results.map(e=>(
        {
            Id_Evento: e.Id_Evento,
            Nombre_Evento: e.Nombre_Evento,
            Fecha_Evento: e.Fecha_Evento,
            Nom_Categoria: e.tb_categorium?.Nom_Categoria, 
            Nom_Local: e.tb_local?.Nom_Local,
            Capacidad_Local: e.tb_local?.Capacidad_Local

        }));

    /*
    const [results, fields] = await orm.query( 
        `select E.Id_Evento,E.Nombre_Evento, E.Fecha_Evento,
                C.Nom_Categoria, L.Nom_Local, L.Capacidad_Local 
         from tb_evento E 
         inner join tb_categoria C 
         on E.Id_Cate = C.Id_Cate 
         inner join tb_local L 
         on E.Id_Local = L.Id_Local order by E.Id_Evento`);

    console.log(`Resultados en modelo:`)
    console.log(results);
    return results;
    */
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Evento) {
    console.log("----------------------Model para Listar por ID--------------------")
        const results = await Evento.findAll(
        {
            //Campos que quiero mostrar de la tabla Eventos
            attributes: ['Id_Evento','Nombre_Evento','Fecha_Evento'],
            include:
            [
                {
                    model: Categoria,
                    //Campos que quiero mostrar que pertenecen a Categoria
                    attributes:['Nom_Categoria']
                },
                {
                    model: Local,
                    //Campos que quiero mostrar que pertenecen a Local
                    attributes:['Nom_Local','Capacidad_Local']
                }
            ],
            order: [['Id_Evento', 'ASC']],
            where:{
                Id_Evento: Id_Evento
            }
        }
    )

    console.log(`Resultados en modelo:`)
  /*  console.log(results);*/
    return results.map(e=>(
        {
            Id_Evento: e.Id_Evento,
            Nombre_Evento: e.Nombre_Evento,
            Fecha_Evento: e.Fecha_Evento,
            Nom_Categoria: e.tb_categorium?.Nom_Categoria, 
            Nom_Local: e.tb_local?.Nom_Local,
            Capacidad_Local: e.tb_local?.Capacidad_Local
        }));
    /*
    const [results, fields] = await orm.query( 
        `select E.Id_Evento,E.Nombre_Evento, 
                E.Fecha_Evento,C.Nom_Categoria, L.Nom_Local, L.Capacidad_Local 
         from tb_evento E 
         inner join tb_categoria C 
         on E.Id_Cate = C.Id_Cate 
         inner join tb_local L 
         on E.Id_Local = L.Id_Local 
         where E.Id_Evento=?  order by E.Id_Evento`,
         {
            replacements:[Id_Evento]
         }
        )
    console.log(results);
    return results[0];
    */
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objEvento) {
 
    console.log("----------------------Model Insertar nuevo Evento--------------------")
    
    try {
            const evento = await Evento.create(
        {
            Nombre_Evento: objEvento.Nombre_Evento,
            Fecha_Evento: objEvento.Fecha_Evento,
            Hora_Evento: objEvento.Hora_Evento,
            Id_Cate: objEvento.Id_Cate,
            Id_Local:objEvento.Id_Local
        });

        console.log(`Resultados en modelo:`)
        console.log(evento)
        console.log(`ID de Evento Insertado:`)
        console.log(evento.toJSON().Id_Evento)

        return evento.toJSON().Id_Evento;

    } catch (error) {
        console.error("Error al insertar evento:", error.message);
        throw error;
    }
    /*
    const [results, metadata] = await orm.query( 
            `INSERT INTO tb_evento (Nombre_Evento,Fecha_Evento,Hora_Evento, Id_Cate, Id_Local) 
            VALUES (?, ?,?, ?,?)`,
            {
                replacements:[objEvento.Nombre_Evento, objEvento.Fecha_Evento,objEvento.Hora_Evento,
             objEvento.Id_Cate,objEvento.Id_Local]
            }
            );

    console.log(`Resultados en modelo:`)
    console.log(results);
    return results;
    */
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (Id_Evento, objEvento) {
 
    console.log("----------------------Model Modificar Evento--------------------")
    try {
        const [updatedRows] = await Evento.update(
            {
                Nombre_Evento: objEvento.Nombre_Evento,
                Fecha_Evento: objEvento.Fecha_Evento,
                Hora_Evento: objEvento.Hora_Evento,
                Id_Cate: objEvento.Id_Cate,
                Id_Local:objEvento.Id_Local            
            },
            {
                where:{
                    Id_Evento: Id_Evento
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
    /*
    const [results, fields] = await orm.query( 
            `update tb_evento 
             set Nombre_Evento = ?, Fecha_Evento = ?, Hora_Evento=?,Id_Cate =?,Id_Local=?,Activo=? 
             where Id_Evento = ?`,
             {
                replacements:[objEvento.Nombre_Evento, objEvento.Fecha_Evento,objEvento.Hora_Evento,
                    objEvento.Id_Cate,objEvento.Id_Local,objEvento.Activo,Id_Evento]
             }
            );
             
        console.log(`Resultados en modelo:`)
        console.log(`Filas afectadas: ${results.affectedRows}`);
        return results.affectedRows;  
    */    
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete

export const deleteRow = async function (activo,Id_Evento) {
 
    console.log("----------------------Model Delete (modificar activo false) Evento--------------------")
    
    const [results, fields] = await orm.query(
            `update tb_evento set Activo=?  where Id_Evento = ?`,
            {
                replacements:[activo,Id_Evento]
            });
    
        console.log(`Resultados en modelo:`)
        console.log(`Filas afectadas: ${results.affectedRows}`);
        return results.affectedRows; 
}