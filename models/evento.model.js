//Importar configuración de conexión a la BD
import orm from '../config/sequelize.js'


export const connect = async function () {
    await orm.authenticate();

    console.log('La conexión ha sido establecida')
}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método getAll

export const getAll = async function () {
 
    console.log("----------------------Model--------------------")
    
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
}