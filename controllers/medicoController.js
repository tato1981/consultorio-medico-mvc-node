import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Medico from "../models/Medico.js"
import {generarJWTMedico, generarIdMedico } from '../helpers/tokens.js'
import {emailRegistroMedico, olvidePasswordMedico } from '../helpers/emails.js'


//controlador del aplicativo
const formularioLoginMedico = (req,res)=> {
    res.render('auth/login-medico', {
        pagina: 'Iniciar Sesión Medicos',
        csrfToken: req.csrfToken(),
    })
}

const cerrarSesion = (req, res) =>{
    return res.clearCookie('_token').status(200).redirect('/auth/menu-usuarios/inicio-usuarios')
  }

//autenticacion login medicos

const autenticarLoginMedico = async (req, res) =>{
    //validacion formulario login
    await check('email').isEmail().withMessage('El Email es Obligatorio').run(req)
    await check('password').notEmpty().withMessage('El Password es obligatorio').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/login-medico', {
            pagina: 'Iniciar Sesión Medicos',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {email, password} = req.body

    //comprobar si el medico existe
    const medico = await Medico.findOne({where: {email}})
    if(!medico){
        //errores del formulario login
        return res.render('auth/login-medico', {
            pagina: 'Iniciar Sesión Medicos',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Medico No Existe'}],                        
        })
    }

    //Comprobar si el Medico esta confirmado
    if(!medico.confirmado){
        //errores del formulario login
        return res.render('auth/login-medico', {
            pagina: 'Iniciar Sesión Medicos',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu cuenta no esta Conformada'}],                        
        })
    }

    //Revisar el Password
    if(!medico.verificarPassword(password)){
        return res.render('auth/login-medico', {
            pagina: 'Iniciar Sesión Medicos',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El password es Incorrecto'}],                        
        })
    }

    //autenticar al usuario
    const token = generarJWTMedico({id: medico.id, nombre: medico.nombre})

    console.log(token)

    //almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true,
        //sameSite: true
    }).redirect('/menu-medicos')
    
}

const formularioRegistroMedico = (req,res)=> {

    res.render('auth/registro-medico', {
    pagina: 'Crear Cuenta Medico',
    csrfToken: req.csrfToken(),
    barra: 'true',
})
}

//registrar medico
const registrarMedico = async(req, res) => {
    //validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellidos').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('documento').notEmpty().withMessage('El documento es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    await check('especialidad').notEmpty().withMessage('La especialidad es obligatoria').run(req) 
    await check('telefono').notEmpty().withMessage('El teléfono es').run(req)           
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req)
    


    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/registro-medico', {
            pagina: 'Crear Cuenta Medico',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            barra:true,            
            //autollenado del formurio
            medico:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,
                especialidad: req.body.especialidad,
                telefono: req.body.telefono,
                
            }
        })
    }

    

    //verificar si el medico ya esta registrado existe
    //extraer los datos
    const {nombre, apellidos, documento, email, especialidad, telefono, password} = req.body;

    //verificar que el usuario ya existe
    const existeMedico = await Medico.findOne({ where: { documento } })    
    if(existeMedico){
        return res.render('auth/registro-medico', {
            pagina: 'Crear Cuenta Medico',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El medico ya esta registrado'}],
            //autollenado del formurio medico
            medico:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,
                especialidad: req.body.especialidad,
                telefono: req.body.telefono,
                

            }
        })
    }   
    
    //almacenar un usuario
    const medico = await Medico.create({
        nombre,
        apellidos,
        documento,
        email,
        especialidad,
        telefono,       
        password,
        token: generarIdMedico()
    })

    //envia email de confirmacion
    emailRegistroMedico({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        email: req.body.email,
        especialidad: req.body.especialidad,
        telefono: req.body.telefono,       
        token: medico.token
    })
    //mostrar mensaje de confirmacion

    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación, presiona en el enlace'
    })
}

//funcion que comprueba una cuenta
const confirmar = async (req, res) => {
    const{token} = req.params;
    

    //verificar si el token es valido
    const medico = await Medico.findOne({where: {token}})

    if(!medico){
        return res.render('auth/confirmar-cuenta-medico', {
            pagina: 'Error al Confirmar la Cuenta',
            mensaje: 'Hubo un error al confirmar la cuenta, intenta de nuevo',
            error: true
        })  
    }
    //confirmar la cuenta
    medico.token = null;
    medico.confirmado = true;
    await medico.save();

    res.render('auth/confirmar-cuenta-medico', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente'        
    })  
}

const formularioOlvidePasswordMedico = (req,res)=> {
    res.render('auth/olvide-password-medico', {
        pagina: 'Recupera acceso al Consultorio Medico',
        csrfToken: req.csrfToken(),
    })
}

const resetPasswordMedico = async (req,res) =>{

    //validaciones reset password    
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    
    let resultado = validationResult(req)

    //verificar que el resultado de las validaciones este vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/olvide-password-medico', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    //buscar al usuario
    const {email} = req.body;
    const medico = await Medico.findOne({where: {email}})
    if(!medico){
        return res.render('auth/olvide-password-medico', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Email no Pertenece a Ningún Medico'}]
        })
    }

    //generar token y enviar el email.
    medico.token = generarIdMedico();
    await medico.save();

    //enviar un email
    olvidePasswordMedico({
        nombre:   medico.nombre,
        apellidos: medico.apellidos,
        documento: medico.documento,
        email: medico.email,
        especialidad: medico.especialidad,
        telefono: medico.telefono,
        token: medico.token
    })

    //rendirizar un mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece Tu Password',
        mensaje: 'Hemos Enviado un Email con las instrucciones.'
    })

}

const comprobarTokenMedico = async (req, res) => {
    const {token} = req.params

    const medico = await Medico.findOne({where: {token}})

    if(!medico){
        return res.render('auth/confirmar-cuenta-medico', {
            pagina: 'Restablece Tu Password',
            mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        })  
    }

    //mostrar formulario para modificar el password
    res.render('auth/reset-password-medico', {
        pagina: 'Restablece tu Password',
        csrfToken: req.csrfToken()

    })

}

const nuevoPasswordMedico = async(req, res) =>{
    //validar el password
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/reset-password-medico', {
            pagina: 'Restablece Tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {token} = req.params
    const {password} = req.body

    //Identificar quien hace el cambio
    const medico = await Medico.findOne({where: {token}})
    
    //hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    medico.password = await bcrypt.hash(password, salt);
    medico.token = null

    await medico.save()
    
    res.render('auth/confirmar-cuenta-medico', {
        pagina: 'Password Restablecido',
        mensaje: 'El password se Guardó correctamente'        
    })  
}


export  {
        formularioLoginMedico,
        cerrarSesion,
        autenticarLoginMedico,
        formularioRegistroMedico,
        registrarMedico,
        confirmar,
        formularioOlvidePasswordMedico,
        resetPasswordMedico,
        comprobarTokenMedico,
        nuevoPasswordMedico,

}