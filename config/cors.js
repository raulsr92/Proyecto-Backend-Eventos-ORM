
import cors from 'cors'
import { FRONTEND_URL } from '../utils/constantes.js'

console.log(`CORS: ${FRONTEND_URL}`);

const corsOptions ={
    origin: FRONTEND_URL ,
    methods: ['GET', 'POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-type','Authorization'],
    credentials: true
}

export default cors(corsOptions)