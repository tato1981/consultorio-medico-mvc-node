
import express from 'express';
import { body } from 'express-validator'
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import { admin, listarUsuarios, eliminarUsuarios, editarUsuarios, guardarCambios, listarMedicos, eliminarMedicos, editarMedicos, guardarCambiosMedico} from '../controllers/menu-admin-controller.js'
import protegerRutaAdmin from '../middelware/protegerRuta.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-admin',   admin)

//routes crud usuarios
router.get('/menu-admin/listado-usuarios', listarUsuarios),
router.post('/menu-admin/listado-eliminar/:id', eliminarUsuarios),
router.get('/menu-admin/editarUsuarios/:id', editarUsuarios),

router.post('/menu-admin/editarUsuarios/:id',

body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambios,
)

//routes crud medicos
router.get('/menu-admin/listado-medicos', listarMedicos),
//eliminar medicos
router.post('/menu-admin/listado-eliminar-medico/:id', eliminarMedicos),
//editar medicos
router.get('/menu-admin/editarMedicos/:id', editarMedicos),
router.post('/menu-admin/editarMedicos/:id',

body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('especialidad').notEmpty().withMessage('La especialidad es Obligatoria'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambiosMedico,

)










export default router;