

import express from 'express';
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import {admin } from '../controllers/menu-admin-controller.js'


const router = express.Router();

//rautes menu usuarios
router.get('/menu-admin', admin)







export default router;