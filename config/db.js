console.log("Hola Mundo, soy Raúl en el archivo db")

// Importación de paquetes

import _mysql from 'mysql2/promise'

// Crear pool de conexiones

const pool = _mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'eventosdb',
        waitForConnections: true,
        connectionLimit: 2,
        queueLimit: 0
    }
)

export default pool