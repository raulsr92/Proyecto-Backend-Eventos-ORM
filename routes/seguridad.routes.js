import express from 'express'

import * as cseguridad from '../controllers/seguridad.controller.js'

// Instancias

const router = express.Router();

// Rutas

router.post("/login",cseguridad.login);
router.post("/refresh-token",cseguridad.refreshToken)
router.post("/generar-otp", cseguridad.generarOTP)
router.post("/verificar-otp", cseguridad.verificarOTP)

export default router;

