
import * as sseguridad from '../services/seguridad.service.js'
import * as auth from '../config/auth.js'

// Funciones exportables

// Método Login

export const login = async (req, res) => {
    const { correo_usuario, pass_usuario } = req.body;
    try {
        const usuarios = await sseguridad.login(correo_usuario);
        if (!usuarios[0]) return res.status(403).json({ error: "Correo no registrado" });

        const usuario = usuarios[0];
        if (!usuario.Activo) return res.status(403).json({ error: "Usuario bloqueado" });

        if (usuario.pass_usuario !== pass_usuario) {
            await sseguridad.incrementarErrores(usuario.id_usuario, usuario.num_errores_usuario);
            return res.status(403).json({ error: `Contraseña incorrecta. Intento ${usuario.num_errores_usuario + 1}/3` });
        }

        await sseguridad.resetearErrores(usuario.id_usuario);

        const token = auth.generateToken(usuario);
        const refreshToken = auth.generateRefreshToken(usuario);

        res.json({
            token,
            refreshToken,
            user: {
                id_persona: usuario.id_usuario,
                email: usuario.correo_usuario,
                rol: usuario.rol_usuario
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const generarOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sseguridad.generarOTP(email);
        res.json({ mensaje: "OTP generado correctamente", otp }); // Muestra el OTP (en un real se enviaría por correo)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const verificarOTP = async (req, res) => {
    const { email, otp, nuevaPassword } = req.body;
    try {
        await sseguridad.verificarOTP(email, otp, nuevaPassword);
        res.json({ mensaje: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Método Refresh Token

export const refreshToken = async function (req, res) {
    console.log("------------Seguridad controller------------");
    const { refreshToken } = req.body;
    console.log(`RefreshToken: ${refreshToken}`);

    if (!refreshToken) {
        return res.status(401).json({ "error": "Refresh token requerido" });
    }

    try {
        const decoded = auth.verifyRefreshToken(refreshToken);
        console.log(`Decoded(payload):`, decoded);
        console.log(`ID del usuario:`, decoded.id_persona);

        const usuarios = await sseguridad.findUserById(decoded.id_persona);
        console.log(`Resultado del findUserById:`, usuarios);

        if (usuarios[0]) {
            const token = auth.generateToken(usuarios[0]);
            console.log(`Nuevo Token: ${token}`);

            return res.json({
                token,
                user: {
                    id_persona: usuarios[0].id_usuario,
                    email: usuarios[0].correo_usuario,
                    rol: usuarios[0].rol_usuario,
                }
            });
        } else {
            return res.status(403).json({ "error": "Acceso no autorizado" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "error": "Error obteniendo registros" });
    }
};
