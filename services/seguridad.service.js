// Importar modelo de Sequelize
import * as modelUsuario from '../models/usuario.model.js';

// Método Login
export const login = async function(correo_usuario) {
    console.log("----------------------Service Seguridad - login--------------------");
    try {
        const usuario = await modelUsuario.login(correo_usuario);
        console.log("Usuario encontrado:", usuario);
        return usuario;
    } catch (err) {
        console.log("Error en login:", err);
        throw err;
    }
};

// Método Incrementar Errores de Login
export const incrementarErrores = async function(id_usuario, erroresActuales) {
    console.log("----------------------Service Seguridad - incrementarErrores--------------------");
    try {
        const result = await modelUsuario.incrementarErrores(id_usuario, erroresActuales);
        console.log("Errores incrementados, resultado:", result);
        return result;
    } catch (err) {
        console.log("Error incrementando errores:", err);
        throw err;
    }
};

// Método Resetear Errores después de login exitoso
export const resetearErrores = async function(id_usuario) {
    console.log("----------------------Service Seguridad - resetearErrores--------------------");
    try {
        const result = await modelUsuario.resetearErrores(id_usuario);
        console.log("Errores reseteados, resultado:", result);
        return result;
    } catch (err) {
        console.log("Error reseteando errores:", err);
        throw err;
    }
};

// Método Generar OTP para recuperación
export const generarOTP = async function(correo_usuario) {
    console.log("----------------------Service Seguridad - generarOTP--------------------");
    try {
        const otp = await modelUsuario.generarOTP(correo_usuario);
        console.log("OTP generado:", otp);
        return otp;
    } catch (err) {
        console.log("Error generando OTP:", err);
        throw err;
    }
};

// Método Verificar OTP y actualizar contraseña
export const verificarOTP = async function(correo_usuario, otp, nuevaPassword) {
    console.log("----------------------Service Seguridad - verificarOTP--------------------");
    try {
        const result = await modelUsuario.verificarOTP(correo_usuario, otp, nuevaPassword);
        console.log("Contraseña actualizada correctamente:", result);
        return result;
    } catch (err) {
        console.log("Error verificando OTP:", err);
        throw err;
    }
};

// Método Buscar Usuario por ID (para refreshToken)
export const findUserById = async function(id_usuario) {
    console.log("----------------------Service Seguridad - findUserById--------------------");
    try {
        const usuario = await modelUsuario.findUserById(id_usuario);
        console.log("Usuario encontrado por ID:", usuario);
        return usuario;
    } catch (err) {
        console.log("Error buscando usuario por ID:", err);
        throw err;
    }
};
