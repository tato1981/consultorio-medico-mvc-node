import express from 'express';
import {admin} from '../controllers/menu-medico-Controller.js'
import protegerRutaMedico from '../middelware/protegerRutaMedico.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-medicos',protegerRutaMedico, admin)


//router.post('/registro-usuario',registrar );




export default router