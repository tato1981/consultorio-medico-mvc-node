
import express from 'express';
import { body } from 'express-validator'
//los export nombrados se deben asignar objeto y termina con la extension del archivo
import { admin, listarUsuarios, eliminarUsuarios, editarUsuarios, guardarCambios, listarMedicos, eliminarMedicos, editarMedicos, guardarCambiosMedico, listarPacientes, eliminarPacientes, editarPacientes, guardarCambiosPacientes, listarCitas, eliminarCitas,editarCitas, guardarCambiosCitas, listarAdmins, eliminarAdmins, editarAdmins,guardarCambiosAdmins} from '../controllers/menu-admin-controller.js'
import protegerRuta from '../middelware/protegerRutaAdmin.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-admin',  admin)

//routes crud usuarios
router.get('/menu-admin/listado-usuarios',listarUsuarios),
router.post('/menu-admin/listado-eliminar/:id',eliminarUsuarios),
router.get('/menu-admin/editarUsuarios/:id',editarUsuarios),

router.post('/menu-admin/editarUsuarios/:id',
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambios,
)

//routes crud medicos
router.get('/menu-admin/listado-medicos',listarMedicos),
//eliminar medicos
router.post('/menu-admin/listado-eliminar-medico/:id', eliminarMedicos),
//editar medicos
router.get('/menu-admin/editarMedicos/:id',editarMedicos),
router.post('/menu-admin/editarMedicos/:id',
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),
body('especialidad').notEmpty().withMessage('La especialidad es Obligatoria'),
body('telefono').notEmpty().withMessage('El teléfono es Obligatorio'),

guardarCambiosMedico,

),

//routes crud pacientes
router.get('/menu-admin/listado-pacientes',listarPacientes),
//eliminar pacientes
router.post('/menu-admin/listado-eliminar-pacientes/:id', eliminarPacientes),
//editar pacientes
router.get('/menu-admin/editarPacientes/:id',editarPacientes),
router.post('/menu-admin/editarPacientes/:id',
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
router.get('/menu-admin/listado-citas',listarCitas)
//eliminar citas
router.post('/menu-admin/listado-eliminar-citas/:id', eliminarCitas),
//editar citas
router.get('/menu-admin/editarCitas/:id',editarCitas),
router.post('/menu-admin/editarCitas/:id',
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
router.get('/menu-admin/listado-admins',listarAdmins)
//eliminar citas
router.post('/menu-admin/listado-eliminar-admins/:id', eliminarAdmins),
//editar citas
router.get('/menu-admin/editarAdmins/:id',editarAdmins),
router.post('/menu-admin/editarAdmins/:id',
body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
body('apellidos').notEmpty().withMessage('El apellido es obligatorio'),
body('documento').notEmpty().withMessage('El documento es obligatorio'),
body('email').isEmail().withMessage('Eso no parece un email valido'),

guardarCambiosAdmins,

)












export default router;