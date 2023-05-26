import { check, validationResult } from 'express-validator'
import Paciente from "../models/Paciente.js"
import Cita from '../models/Cita.js'
import Usuario from '../models/Usuario.js'

//import {Usuario, Paciente, Medico, Cita} from '../models/index.js'

const inicioUsuarios =  (req,res) => {
    res.render('menu-usuarios/inicio-usuarios', {
        pagina: 'Inicio Usuarios',
        barra: 'true',       
        
    })
}

const admin = async (req,res) => {

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

 const {hora_cita} = req.body

     //verificar que la cita no este duplicado
 const existeCita = await Cita.findOne({where: {hora_cita}}) //findOne() busca un usuario en la base de datos
 

 if(existeCita){
    return res.render('menu-usuarios/registroCitas', {
        pagina : 'Registrar Cita',//objeto que se quiere pasar a esa vista  
        csrfToken: req.csrfToken(),    
         errores: [{msg: 'La Cita ya esta Asignada para ese dia y hora'}],  //array al vuelo
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


//crud citas
//listar citas
const listarCitas = async (req,res) =>{

    const citas = await Cita.findAll({ })

      res.render('menu-usuarios/listado-citas', {
        pagina: 'Citas Registradas',
        csrfToken: req.csrfToken(),      
        barra: 'true',
        citas,

    })  
}

//editar cita

const  editarCitas = async (req, res) =>{

    const {id} = req.params

    //validar se el paciente existe
    const cita = await Cita.findByPk(id)

    if(!cita){
        return res.redirect('/menu-usuarios/admin')
    }


    const [citas] = await Promise.all([  
        Cita.findAll()
    ])

    res.render('menu-usuarios/editarCitas', {
        pagina: `Editar Citas: ${cita.nombre}`,
        csrfToken: req.csrfToken(),
        barra: true,
        citas,
        cita
    })   

}

const guardarCambiosCitas = async (req,res) =>{

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        const [cita] = await Promise.all([  
            Cita.findAll()
        ])
    
        return res.render('menu-usuarios/editarCitas', {
                pagina: 'Editar Citas',
                csrfToken: req.csrfToken(),
                barra: true,
                cita,
                errores: resultado.array(),
                cita: req.body
        })

    }

    const {id} = req.params

    //validar si la cita existe
    const cita = await Cita.findByPk(id)

    if(!cita){
        return res.redirect('/menu-usuarios/admin')
    }

    //reescribir la cita y guardarla

    try {
        const {nombre, apellidos, documento, fecha_nacimiento, edad, email, telefono, servicio_medico} = req.body;

        cita.set({
            nombre,
            apellidos,
            documento,
            fecha_nacimiento,
            edad,
            email,
            telefono,
            servicio_medico
        })

        await cita.save();

        res.redirect('/menu-usuarios/listado-citas')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar cita
const eliminarCitas = async (req, res) => {
    const {id} = req.params

    const citas = await Cita.findByPk(id)

    if(!citas) {
        return res.redirect('/menu-usuarios/listado-citas')
    }

        // Eliminar la propiedad
    await citas.destroy()
    res.redirect('/menu-usuarios/listado-citas')

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//crud pacientes

//listar pacientes
const listarPacientes = async (req,res) =>{

    const pacientes = await Paciente.findAll({ })

      res.render('menu-usuarios/listado-pacientes', {
        pagina: 'Pacientes Registrados',
        csrfToken: req.csrfToken(),      
        barra: 'true',
        pacientes,

    })  
}

//editar pacientes

const  editarPacientes = async (req, res) =>{

    const {id} = req.params

    //validar se el paciente existe
    const paciente = await Paciente.findByPk(id)

    if(!paciente){
        return res.redirect('/menu-usuarios/admin')
    }


    const [pacientes] = await Promise.all([  
        Paciente.findAll()
    ])

    res.render('menu-usuarios/editarPacientes', {
        pagina: `Editar Pacientes: ${paciente.nombre}`,
        csrfToken: req.csrfToken(),
        barra: true,
        pacientes,
        paciente
    })   

}

const guardarCambiosPacientes = async (req,res) =>{

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        const [paciente] = await Promise.all([  
            Paciente.findAll()
        ])
    
        return res.render('menu-usuarios/editarPacientes', {
                pagina: 'Editar Pacientes',
                csrfToken: req.csrfToken(),
                barra: true,
                paciente,
                errores: resultado.array(),
                paciente: req.body
        })

    }

    const {id} = req.params

    //validar se el paciente existe
    const paciente = await Paciente.findByPk(id)

    if(!paciente){
        return res.redirect('/menu-usuarios/admin')
    }

    //reescribir al paciente y guardarlo

    try {
        const {nombre, apellidos, documento, fecha_nacimiento, edad, email, telefono, servicio_medico} = req.body;

        paciente.set({
            nombre,
            apellidos,
            documento,
            fecha_nacimiento,
            edad,
            email,
            telefono,
            servicio_medico
        })

        await paciente.save();

        res.redirect('/menu-usuarios/listado-pacientes')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar pacientes
const eliminarPacientes = async (req, res) => {
    const {id} = req.params

    const pacientes = await Paciente.findByPk(id)

    if(!pacientes) {
        return res.redirect('/menu-usuarios/listado-pacientes')
    }

        // Eliminar la propiedad
    await pacientes.destroy()
    res.redirect('/menu-usuarios/listado-pacientes')

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inicioPagos = (req,res) =>{

    res.render('menu-usuarios/pagos', {
        pagina: 'Medios de Pagos',
        barra: 'true',       
            
        })
    }

const pagoEfectivo = (req,res) =>{

        res.render('menu-usuarios/pago-efectivo', {
            pagina: 'Pago en Efectivo',
            barra: 'true',       
                
            })
        }
    
const pagoTarjeta = (req,res) =>{

        res.render('menu-usuarios/pago-tarjeta', {
            pagina: 'Pago Tarjeta de Crédito',
            barra: 'true',       
                    
        })
}

const transferencia = (req,res) =>{

    res.render('menu-usuarios/transferencia', {
        pagina: 'Transferencia Bancaria',
        barra: 'true',       
            
        })
    }

        



export {
    inicioUsuarios,
    admin,
    formularioRegistroPacientes, 
    registrar,
    formularioRegistroCitas,
    registrarCita,
    //crud citas en el panel de usuario
    listarCitas,
    editarCitas,
    guardarCambiosCitas,
    eliminarCitas,
    //crud pacientes
    listarPacientes,
    editarPacientes,
    guardarCambiosPacientes,
    eliminarPacientes,
    //pagos
    inicioPagos,
    pagoEfectivo,
    pagoTarjeta,
    transferencia,
}




