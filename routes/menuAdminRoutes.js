
import express from 'express';
import { body } from 'express-validator'
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import { admin, listarUsuarios, eliminarUsuarios, editarUsuarios, guardarCambios, listarMedicos, eliminarMedicos, editarMedicos, guardarCambiosMedico, listarPacientes, eliminarPacientes, editarPacientes, guardarCambiosPacientes, listarCitas, eliminarCitas,editarCitas, guardarCambiosCitas, listarAdmins, eliminarAdmins, editarAdmins,guardarCambiosAdmins} from '../controllers/menu-admin-controller.js'
import protegerRutaAdmin from '../middelware/protegerRutaAdmin.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-admin', protegerRutaAdmin,  admin)

//routes crud usuarios
router.get('/menu-admin/listado-usuarios',protegerRutaAdmin,listarUsuarios),
router.post('/menu-admin/listado-eliminar/:id',protegerRutaAdmin,eliminarUsuarios),
router.get('/menu-admin/editarUsuarios/:id',protegerRutaAdmin,editarUsuarios),

router.post('/menu-admin/editarUsuarios/:id',protegerRutaAdmin,
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambios,
)

//routes crud medicos
router.get('/menu-admin/listado-medicos',protegerRutaAdmin,listarMedicos),
//eliminar medicos
router.post('/menu-admin/listado-eliminar-medico/:id', eliminarMedicos),
//editar medicos
router.get('/menu-admin/editarMedicos/:id',protegerRutaAdmin,editarMedicos),
router.post('/menu-admin/editarMedicos/:id',protegerRutaAdmin,
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('especialidad').notEmpty().withMessage('La especialidad es Obligatoria'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambiosMedico,

),

//routes crud pacientes
router.get('/menu-admin/listado-pacientes',protegerRutaAdmin,listarPacientes),
//eliminar pacientes
router.post('/menu-admin/listado-eliminar-pacientes/:id', eliminarPacientes),
//editar pacientes
router.get('/menu-admin/editarPacientes/:id',protegerRutaAdmin,editarPacientes),
router.post('/menu-admin/editarPacientes/:id',protegerRutaAdmin,
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('fecha_nacimiento').notEmpty().withMessage('la fecha de nacimiento es obligatorio'),
body('edad').notEmpty().withMessage('la edad es obligatoria'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),
body('servicio_medico').notEmpty().withMessage('el servicio medico es obligatorio'),

guardarCambiosPacientes,

),

//routes crud citas
router.get('/menu-admin/listado-citas',protegerRutaAdmin,listarCitas)
//eliminar citas
router.post('/menu-admin/listado-eliminar-citas/:id', eliminarCitas),
//editar citas
router.get('/menu-admin/editarCitas/:id',protegerRutaAdmin,editarCitas),
router.post('/menu-admin/editarCitas/:id',protegerRutaAdmin,
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('fecha_nacimiento').notEmpty().withMessage('la fecha de nacimiento es obligatorio'),
body('edad').notEmpty().withMessage('la edad es obligatoria'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),
body('servicio_medico').notEmpty().withMessage('el servicio medico es obligatorio'),

guardarCambiosCitas,

),

//routes crud admins
router.get('/menu-admin/listado-admins',protegerRutaAdmin,listarAdmins)
//eliminar citas
router.post('/menu-admin/listado-eliminar-admins/:id', eliminarAdmins),
//editar citas
router.get('/menu-admin/editarAdmins/:id',protegerRutaAdmin,editarAdmins),
router.post('/menu-admin/editarAdmins/:id',protegerRutaAdmin,
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),

guardarCambiosAdmins,

)










export default router;