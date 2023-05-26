import express from 'express'
import {formularioLoginMedico, autenticarLoginMedico, formularioRegistroMedico, registrarMedico, confirmar, formularioOlvidePasswordMedico, resetPasswordMedico, comprobarTokenMedico, nuevoPasswordMedico} from '../controllers/medicoController.js';
import protegerRutaMedico from '../middelware/protegerRutaMedico.js';

const router = express.Router();

//Routes o URL del aplicativo
router.get('/login-medico', formularioLoginMedico);
router.post('/login-medico', autenticarLoginMedico);

router.get('/registro-medico',protegerRutaMedico, formularioRegistroMedico );
router.post('/registro-medico',protegerRutaMedico, registrarMedico );

router.get('/confirmar-cuenta-medico/:token', confirmar);

router.get('/olvide-password-medico', formularioOlvidePasswordMedico );
router.post('/olvide-password-medico', resetPasswordMedico );

//almacena el nuevo password

router.get('/olvide-password-medico/:token', comprobarTokenMedico );
router.post('/olvide-password-medico/:token', nuevoPasswordMedico);


export default router

