
// Importación de paquetes

import express from 'express'

import * as cusuarios from '../controllers/usuarios.controller.js'

// Instancias

const router = express.Router();


// Rutas

router.get("/",cusuarios.getAll);
router.get("/:id",cusuarios.getById);
router.post("/", cusuarios.create)
router.put("/:id",cusuarios.update)
router.delete("/:id",cusuarios.deleteRow)

export default router;