
import express from 'express'
import * as cfile from "../controllers/file.controller.js"
const router = express.Router();

router.post('/upload', cfile.upload);

/*
router.post('/uploadmem', cfile.uploadmem);
router.post('/copiar', cfile.copiar);*/

export default router;