import express from 'express';
//import { body } from 'express-validator'
import {formularioLoginAdmin, autenticarLoginAdmin, formularioRegistroAdmin, registrarAdmin, confirmarAdmin, formularioOlvidePasswordAdmin, resetPasswordAdmin, comprobarTokenAdmin, nuevoPasswordAdmin} from  '../controllers/adminController.js'
import protegerRutaAdmin from '../middelware/protegerRutaAdmin.js';

const router = express.Router();

router.get('/login-admin',  formularioLoginAdmin)
router.post('/login-admin', autenticarLoginAdmin);

router.get('/registro-admin',protegerRutaAdmin, formularioRegistroAdmin );
router.post('/registro-admin',protegerRutaAdmin, registrarAdmin );

router.get('/confirmar-cuenta-admin/:token', confirmarAdmin);

router.get('/olvide-password-admin',  );
router.post('/olvide-password-admin', resetPasswordAdmin );

router.get('/olvide-password-admin/:token', comprobarTokenAdmin);
router.post('/olvide-password-admin/:token', nuevoPasswordAdmin);


export default router