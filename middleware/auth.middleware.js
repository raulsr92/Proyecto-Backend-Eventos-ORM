
// Importación de funciones de autenticacion de archivo auth.js

import * as auth from '../config/auth.js'

// Definir middleware

export const authMiddleware = function (roles=[]) {
    return (req,res,next)=>{
        const authHeader  = req.headers.authorization;
        console.log(`authHeader here: ${authHeader}`)
        console.log(`Roles: ${roles}`);
        console.log(`Nro roles: ${roles.length}`)

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }
        try {
            // Capturar solo el token 
            const token = authHeader.split(" ")[1];
            console.log(`Token puro: ${token}`)
            //Verificar token y almacenar el playload del token
            const decoded = auth.verifyToken(token);
            console.log(`Decoded(playload):`)
            console.log(decoded)
            // Validacion del rol dentro de token
            console.log(`Nro roles: ${roles.length}`)
            if(roles.length>0 && !roles.includes(decoded.rol)){
                return res.status(403).json({error:'Permisos insuficientes' })
            }
            req.user = decoded;
            next();

        } catch (error) {

            res.status(error.name == 'TokenExpiredError'?401:403).json({ error: error.message });
        }

    }
}
