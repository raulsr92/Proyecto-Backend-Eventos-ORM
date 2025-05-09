// Importación de paquetes

import express from 'express'

import * as ceventos from '../controllers/eventos.controller.js'

// Importar el middleware

import * as mauth from '../middleware/auth.middleware.js'

// Instancias

const router = express.Router();

// Rutas

router.get("/",ceventos.getAll);
router.get("/:id",ceventos.getById);
router.post("/",mauth.authMiddleware() ,ceventos.create)
router.put("/:id",mauth.authMiddleware(["administrador"]),ceventos.update)
router.delete("/:id",mauth.authMiddleware(["administrador"]),ceventos.deleteRow)

export default router;
