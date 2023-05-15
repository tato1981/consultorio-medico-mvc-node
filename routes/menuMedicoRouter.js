import express from 'express';
import {admin} from '../controllers/menu-medico-Controller.js'
import protegerRuta from '../middelware/protegerRuta.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-medicos', protegerRuta, admin)


//router.post('/registro-usuario',registrar );




export default router