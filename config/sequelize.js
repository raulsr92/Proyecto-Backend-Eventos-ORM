// Importación de paquetes
import Sequelize from 'sequelize';

//Conexion a la BD

const orm = new Sequelize(
    'eventosdb',
    'root',
    'RavL92$An60#',
    {
        host:'localhost',
        dialect:'mysql'
    }
);

export default orm;