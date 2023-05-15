
import express from 'express';
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import {formularioLoginUsuario,autenticarLoginUsuario, formularioRegistroUsuario, registrar, confirmar, formularioOlvidePasswordUsuario, resetPassword, comprobarTokenUsuario,nuevoPasswordUsuario } from '../controllers/usuarioController.js'


const router = express.Router();


//Routes o URL del aplicativo
router.get('/login-usuario', formularioLoginUsuario)
router.post('/login-usuario', autenticarLoginUsuario);

router.get('/registro-usuario', formularioRegistroUsuario );
router.post('/registro-usuario', registrar );

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password-usuario', formularioOlvidePasswordUsuario );
router.post('/olvide-password-usuario', resetPassword );

//almacena el nuevo password

router.get('/olvide-password-usuario/:token', comprobarTokenUsuario );
router.post('/olvide-password-usuario/:token', nuevoPasswordUsuario );





export default router;
