import express from 'express';
import { body } from 'express-validator'
import {admin, listarCitas, eliminarCitas, editarCitas, guardarCambiosCitas, formularioRegistroHistoriaClinica, formularioRegistroFormulaMedica, registroIncapacidadMedica} from '../controllers/menu-medico-Controller.js'
import protegerRuta from '../middelware/protegerRutaMedico.js';

const router = express.Router();

//rautes menu usuarios
router.get('/menu-medicos', admin)

//routes crud citas
router.get('/menu-medicos/listado-citas',listarCitas),

//eliminar citas
router.post('/menu-medicos/listado-eliminar-citas/:id', eliminarCitas),
//editar citas
router.get('/menu-medicos/editarCitas/:id',editarCitas),
router.post('/menu-medicos/editarCitas/:id',
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

//historias Clinicas
router.get('/menu-medicos/registroHistoriaClinica', formularioRegistroHistoriaClinica );


//formulas medicas
router.get('/menu-medicos/registroFormulaMedica', formularioRegistroFormulaMedica );

//incapacidades medicas
router.get('/menu-medicos/registroIncapacidadMedica', registroIncapacidadMedica );



export default router