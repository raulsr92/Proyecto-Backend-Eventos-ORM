// Importación de paquetes

import express from 'express'

import * as cpedidos from '../controllers/pedidos.controller.js'

// Instancias

const router = express.Router();

// Rutas

router.get("/",cpedidos.getAll);
router.get("/:id",cpedidos.getById);
router.post("/", cpedidos.create)
router.put("/:id",cpedidos.update)

export default router;