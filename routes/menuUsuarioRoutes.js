
import express from 'express';
import {inicioUsuarios, admin, formularioRegistroPacientes, registrar, formularioRegistroCitas, registrarCita} from '../controllers/menu-usuario-controller.js'
import protegerRuta from '../middelware/protegerRuta.js';


const router = express.Router();

//rautes menu usuarios

router.get('/menu-usuarios', protegerRuta, admin)

router.get('/menu-usuarios/inicio-usuarios', inicioUsuarios)

router.get('/menu-usuarios/registroPacientes', formularioRegistroPacientes );
router.post('/menu-usuarios/registroPacientes', registrar );
//router.post('/registro-usuario',registrar );

//registro de citas
router.get('/menu-usuarios/registroCitas', formularioRegistroCitas)
router.post('/menu-usuarios/registroCitas', registrarCita)


export default router