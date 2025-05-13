
// Importación de paquetes

import express from 'express'

import * as cusuarios from '../controllers/usuarios.controller.js'
import * as mauth from "../middleware/auth.middleware.js"
// Instancias

const router = express.Router();


// Rutas

router.get("/",mauth.authMiddleware(),cusuarios.getAll);
router.get("/:id",cusuarios.getById);
router.post("/", cusuarios.create)
router.put("/:id",mauth.authMiddleware(),cusuarios.update)
router.delete("/:id",mauth.authMiddleware(),cusuarios.deleteRow)

export default router;