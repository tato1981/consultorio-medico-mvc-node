import { check, validationResult } from 'express-validator'
import Paciente from "../models/Paciente.js"
import Cita from '../models/Citas.js'

const inicioUsuarios =  (req,res) => {

    res.render('menu-usuarios/inicio-usuarios', {
        pagina: 'Inicio Usuarios',
        barra: 'true',       
        
    })
}

const admin =  (req,res) => {

    res.render('menu-usuarios/admin', {
        pagina: 'Menu Principal Usuarios',
        barra: 'true',       
        
    })
}

//formulario registro pacientes
const formularioRegistroPacientes = (req,res) =>{
    res.render('menu-usuarios/registroPacientes', {
        pagina: 'Registro Pacientes',
        csrfToken: req.csrfToken(),
        barra: 'true',
        barraUsuario: 'true'
      
    })
}

//registrar paciente
const registrar = async(req, res) => {
    
   //validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellidos').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('documento').notEmpty().withMessage('El documento es obligatorio').run(req)
    await check('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento debe ser obligatoria').run(req)
    await check('edad').notEmpty().withMessage('La edad debe ser obligatoria').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    await check('telefono').isLength({min: 10}).withMessage('El numero de teléfono debe ser mayor a 10 caracteres').run(req)
    await check('servicio_medico').notEmpty().withMessage('El servicio medico es obligatorio').run(req)

    let resultado = validationResult(req)
        //res.json(resultado.array())

    //verificar que el resultado de las validacioneseste vacio
   if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('menu-usuarios/registroPacientes', {
            pagina: 'Registrar Paciente', 
            csrfToken: req.csrfToken(),          
            errores: resultado.array(),
            barra:true,
            //autollenado del formurio
            paciente:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                fecha_nacimiento: req.body.fecha_nacimiento,
                edad: req.body.edad,   
                email: req.body.email,
                telefono: req.body.telefono,             
                Servicio_medico: req.body.Servicio_medico,
                
            }
        })
    }

    const {documento} = req.body

    //verificar que el paciente no este duplicado
const existePaciente = await Paciente.findOne({where: {documento}}) //findOne() busca un usuario en la base de datos
if(existePaciente){
    return res.render('menu-usuarios/registroPacientes', {
        pagina : 'Registrar Paciente',//objeto que se quiere pasar a esa vista  
        csrfToken: req.csrfToken(),    
        errores: [{msg: 'El paciente ya esta registrado'}],  //array al vuelo
        barra:true,
        paciente:{            
            nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                fecha_nacimiento: req.body.fecha_nacimiento,
                edad: req.body.edad, 
                email: req.body.email,
                telefono: req.body.telefono,             
                Servicio_medico: req.body.Servicio_medico,                    
        }
    })      
}

//almacenar un paciente
const paciente = await Paciente.create( req.body )
    if(paciente){
        res.render('menu-usuarios/registro-paciente-exitoso', {
            pagina: 'Registro Exitoso',
            mensaje: 'Paciente Registrado Correctamente'        
        })  
    }

}

//formulario registro de citas medicas

const formularioRegistroCitas = (req, res) =>{
    res.render('menu-usuarios/registroCitas', {
        pagina: 'Registro Citas',
        csrfToken: req.csrfToken(),
        barra: 'true',
        barraUsuario: 'true'
    })
}

const registrarCita = async (req, res) => {
    
    //validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellidos').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('documento').notEmpty().withMessage('El documento es obligatorio').run(req)
    await check('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento debe ser obligatoria').run(req)
    await check('edad').notEmpty().withMessage('La edad debe ser obligatoria').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    await check('telefono').isLength({min: 7}).withMessage('El numero de teléfono debe ser mayor a 10 caracteres').run(req)
    await check('servicio_medico').notEmpty().withMessage('El servicio medico es obligatorio').run(req)
    await check('especialidad').notEmpty().withMessage('La especialidad es Obligatoria').run(req)
    await check('fecha_cita').notEmpty().withMessage('Establecer una fecha es Obligatoria').run(req)
    await check('hora_cita').notEmpty().withMessage('establecer una hora es obligatoria').run(req)

    let resultado = validationResult(req)
         //res.json(resultado.array())

     //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
     //errores del formulario
        return res.render('menu-usuarios/registroCitas', {
            pagina: 'Registrar Cita', 
            csrfToken: req.csrfToken(),          
            errores: resultado.array(),
            barra:true,
             //autollenado del formurio
            cita:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                fecha_nacimiento: req.body.fecha_nacimiento,
                edad: req.body.edad,   
                email: req.body.email,
                telefono: req.body.telefono,             
                Servicio_medico: req.body.Servicio_medico,
                especialidad: req.body.especialidad,
                fecha_cita: req.body.fecha_cita,             
                hora_cita: req.body.hora_cita,
                
            }
        })
    }

    const {documento} = req.body

     //verificar que el paciente no este duplicado
 const existeCita = await Cita.findOne({where: {documento}}) //findOne() busca un usuario en la base de datos
if(existeCita){
    return res.render('menu-usuarios/registroCitas', {
        pagina : 'Registrar Cita',//objeto que se quiere pasar a esa vista  
        csrfToken: req.csrfToken(),    
         errores: [{msg: 'La Cita ya esta Asignada'}],  //array al vuelo
        barra:true,
        cita:{            
            nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                fecha_nacimiento: req.body.fecha_nacimiento,
                edad: req.body.edad, 
                email: req.body.email,
                telefono: req.body.telefono,             
                Servicio_medico: req.body.Servicio_medico,
                especialidad: req.body.especialidad,
                fecha_cita: req.body.fecha_cita,             
                hora_cita: req.body.hora_cita,                    
        }
    })      
}
 //almacenar un paciente
const cita = await Cita.create( req.body )
    if(cita){
        res.render('menu-usuarios/registro-cita-exitosa', {
            pagina: 'Registro Exitoso',
            mensaje: 'La Cita se Asignó Correctamente'        
        })  
    }

}




export {
    inicioUsuarios,
    admin,
    formularioRegistroPacientes, 
    registrar,
    formularioRegistroCitas,
    registrarCita  
}




