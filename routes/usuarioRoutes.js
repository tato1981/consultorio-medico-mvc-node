
import express from 'express';
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import {formularioLoginUsuario,autenticarLoginUsuario,cerrarSesion,   formularioRegistroUsuario, registrar, confirmar, formularioOlvidePasswordUsuario, resetPassword, comprobarTokenUsuario,nuevoPasswordUsuario } from '../controllers/usuarioController.js'
import protegerRuta from '../middelware/protegerRuta.js';

const router = express.Router();


//Routes o URL del aplicativo
router.get('/login-usuario', formularioLoginUsuario)
router.post('/login-usuario', autenticarLoginUsuario);

//cerrar sesion
router.post('/cerrar-sesion', cerrarSesion)


//registro usuarios
router.get('/registro-usuario', protegerRuta,  formularioRegistroUsuario );
router.post('/registro-usuario', registrar );

//confirmar token
router.get('/confirmar/:token', confirmar)

//olvide password
router.get('/olvide-password-usuario', formularioOlvidePasswordUsuario );
router.post('/olvide-password-usuario', resetPassword );

//almacena el nuevo password
router.get('/olvide-password-usuario/:token', comprobarTokenUsuario );
router.post('/olvide-password-usuario/:token', nuevoPasswordUsuario );





export default router;
