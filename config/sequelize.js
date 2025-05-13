// Importación de paquetes
import Sequelize from 'sequelize';

//Conexion a la BD

const orm = new Sequelize(
    'eventosdb',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql'
    }
);

export default orm;