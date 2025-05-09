
// Importación de paquetes

import jwt from 'jsonwebtoken'
import {JWT_SECRET, JWT_EXPIRES, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES} from '../utils/constantes.js';

// Generar token de acceso

export const generateToken = function (user) {
    console.log(`JWT_SECRET: ${JWT_SECRET}`)
    console.log(`JWT_EXPIRES: ${JWT_EXPIRES}`)

    return jwt.sign(
        { id_persona: user.id_usuario,
            email: user.correo_usuario,
            rol: user.rol_usuario
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES
        }
    )
}

// Generar token de refresco

export const generateRefreshToken = function (user) {
    console.log(`JWT_SECRET_SECRET: ${JWT_REFRESH_SECRET}`)
    console.log(`JWT_SECRET_EXPIRES: ${JWT_REFRESH_EXPIRES}`)

    return jwt.sign(
        { id_persona: user.id_usuario,
        },
        JWT_REFRESH_SECRET,
        {
            expiresIn: JWT_REFRESH_EXPIRES
        }
    )    
}

// Verificar token de acceso

export const verifyToken = function (token){

    try {
        console.log(`JWT_SECRET: ${JWT_SECRET}`)
        console.log(`JWT_EXPIRES: ${JWT_EXPIRES}`)
        return jwt.verify(token,JWT_SECRET);        
    } catch (error) {
        
        throw new Error('Token inválido o expirado');

    }
}

// Verificar token de refresco

export const verifyRefreshToken = function (token){

    try {
        console.log(`JWT_SECRET_SECRET: ${JWT_REFRESH_SECRET}`)
        console.log(`JWT_SECRET_EXPIRES: ${JWT_REFRESH_EXPIRES}`)
        return jwt.verify(token,JWT_REFRESH_SECRET);        
    } catch (error) {
        
        throw new Error('Token inválido o expirado');

    }
}
