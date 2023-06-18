
import express from 'express';
import { body } from 'express-validator'
import {inicioUsuarios, admin, formularioRegistroPacientes, registrar, formularioRegistroCitas, registrarCita, listarCitas, eliminarCitas, editarCitas,guardarCambiosCitas, listarPacientes,eliminarPacientes,editarPacientes, guardarCambiosPacientes, inicioPagos, pagoEfectivo, pagoTarjeta} from '../controllers/menu-usuario-controller.js'
import protegerRuta from '../middelware/protegerRuta.js';


const router = express.Router();

//rautes menu usuarios

router.get('/menu-usuarios', protegerRuta, admin)

router.get('/menu-usuarios/inicio-usuarios', inicioUsuarios)

router.get('/menu-usuarios/registroPacientes', protegerRuta, formularioRegistroPacientes );
router.post('/menu-usuarios/registroPacientes', registrar );
//router.post('/registro-usuario',registrar );

//registro de citas
router.get('/menu-usuarios/registroCitas', protegerRuta, formularioRegistroCitas)
router.post('/menu-usuarios/registroCitas', registrarCita)


//routes crud citas
router.get('/menu-usuarios/listado-citas', protegerRuta, listarCitas)
//eliminar citas
router.post('/menu-usuarios/listado-eliminar-citas/:id', eliminarCitas),
//editar citas
router.get('/menu-usuarios/editarCitas/:id', protegerRuta, editarCitas),
router.post('/menu-usuarios/editarCitas/:id',

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

//routes crud pacientes panel usuarios
router.get('/menu-usuarios/listado-pacientes', protegerRuta, listarPacientes),
//eliminar pacientes
router.post('/menu-usuarios/listado-eliminar-pacientes/:id', eliminarPacientes),
//editar pacientes
router.get('/menu-usuarios/editarPacientes/:id', protegerRuta, editarPacientes),
router.post('/menu-usuarios/editarPacientes/:id',

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

router.get('/menu-usuarios/inicio-pagos', protegerRuta, inicioPagos),
router.get('/menu-usuarios/pago-efectivo',protegerRuta, pagoEfectivo),
router.get('/menu-usuarios/pago-tarjeta', protegerRuta, pagoTarjeta)



export default router