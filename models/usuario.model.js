//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'


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
    
    const [results, fields] = await orm.query( 
            `
            select 
	            id_usuario,
	            nom_usuario,
	            ape_usuario,
	            correo_usuario,
	            cod_telef_usuario,
	            telef_usuario,
	        case 
		        when Activo = 1 then 'Usuario Activo'
		        when Activo = 0 then 'Usuario Inactivo'
	        end as Activo

            from tb_usuario
            `)

    console.log(`Resultados en modelo:`)
    console.log(results);
    return results; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getById

export const getById = async function (Id_Usuario) {
 
    console.log("----------------------Model para Listar por ID--------------------")
    
    const [results, fields] = await orm.query( 
            ` select 
                id_usuario,
                nom_usuario,
                ape_usuario,
                correo_usuario,
                cod_telef_usuario,
                telef_usuario,  
                case 
                    when Activo = 1 then 'Usuario Activo'
                    when Activo = 0 then 'Usuario Inactivo'
                end as Activo
                from
                    tb_usuario where id_usuario = ?
            `,
            {
                replacements:[Id_Usuario]
            }
           )

    console.log(`Resultados en modelo:`)
    console.log(results);
    console.log(results[0]);
    return results;  

}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método create

export const create = async function (objUser) {
 
    console.log("----------------------Modelo Insertar nuevo Usuario--------------------")

    const [results, fields] = await orm.query( 
            `
            INSERT INTO tb_usuario (nom_usuario, ape_usuario, correo_usuario, pass_usuario, tipo_doc_usuario,nro_doc_usuario, pais_usuario,ubigeo,cod_telef_usuario,telef_usuario,fingreso_usuario,num_errores_usuario,Activo, rol_usuario)
			VALUES (?,?,?,?,?,?,?,?,?,?,1,0,1,?)
            `,
            {
                replacements:[objUser.nom_usuario,objUser.ape_usuario,objUser.correo_usuario,objUser.pass_usuario,objUser.tipo_doc_usuario,objUser.nro_doc_usuario,objUser.pais_usuario,objUser.ubigeo,objUser.cod_telef_usuario,objUser.telef_usuario,objUser.rol_usuario]
            }
            );
            
            console.log(`Resultados en modelo:`)
            console.log(results);

          

            return results; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método update

export const update = async function (id_usuario, objUser) {
 
    console.log("----------------------Modelo Modificar Usuario--------------------")
    
    const [results, fields] = await orm.query(
            `
            update tb_usuario set nom_usuario = ?, ape_usuario = ? ,correo_usuario= ?, pass_usuario=?, ubigeo=?, telef_usuario=?, rol_usuario=? where  id_usuario = ?;
            `
            ,
            {
                replacements: [objUser.nom_usuario,objUser.ape_usuario,objUser.correo_usuario,objUser.pass_usuario,
             objUser.ubigeo,objUser.telef_usuario,objUser.rol_usuario,id_usuario]
            }
            )

            console.log(`Resultados en modelo:`)
            console.log(results);

            console.log(`Id de filas modificadas:`)
            console.log(results.affectedRows);

            return results.affectedRows; 
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método delete

export const deleteRow = async function (Id_Usuario) {
 
    console.log("----------------------Service Desactivar usuario--------------------")
    
    const [results, fields] = await orm.query(
         'update tb_usuario set Activo=0  where id_usuario = ?',
         {
            replacements:[Id_Usuario]
         }
        )

    console.log(`Resultados en modelo:`)
    console.log(results);

    console.log(`Id de filas modificadas:`)
    console.log(results.affectedRows);

    return results.affectedRows;            
}