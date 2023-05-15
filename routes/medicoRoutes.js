import express from 'express'
import {formularioLoginMedico, autenticarLoginMedico, formularioRegistroMedico, registrarMedico, confirmar, formularioOlvidePasswordMedico, resetPasswordMedico, comprobarTokenMedico, nuevoPasswordMedico} from '../controllers/medicoController.js'

const router = express.Router();

//Routes o URL del aplicativo
router.get('/login-medico', formularioLoginMedico);
router.post('/login-medico', autenticarLoginMedico);

router.get('/registro-medico', formularioRegistroMedico );
router.post('/registro-medico', registrarMedico );

router.get('/confirmar-cuenta-medico/:token', confirmar);

router.get('/olvide-password-medico', formularioOlvidePasswordMedico );
router.post('/olvide-password-medico', resetPasswordMedico );

//almacena el nuevo password

router.get('/olvide-password-medico/:token', comprobarTokenMedico );
router.post('/olvide-password-medico/:token', nuevoPasswordMedico);


export default router

