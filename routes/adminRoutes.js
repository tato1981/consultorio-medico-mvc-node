import express from 'express';
//import { body } from 'express-validator'
import {formularioLoginAdmin, autenticarLoginAdmin, formularioRegistroAdmin, registrarAdmin, confirmarAdmin, formularioOlvidePasswordAdmin, resetPasswordAdmin, comprobarTokenAdmin, nuevoPasswordAdmin} from  '../controllers/adminController.js'


const router = express.Router();

router.get('/login-admin', formularioLoginAdmin)
router.post('/login-admin', autenticarLoginAdmin);

router.get('/registro-admin', formularioRegistroAdmin );
router.post('/registro-admin', registrarAdmin );

router.get('/confirmar-cuenta-admin/:token', confirmarAdmin);

router.get('/olvide-password-admin', formularioOlvidePasswordAdmin );
router.post('/olvide-password-admin', resetPasswordAdmin );

router.get('/olvide-password-admin/:token', comprobarTokenAdmin);
router.post('/olvide-password-admin/:token', nuevoPasswordAdmin);


export default router