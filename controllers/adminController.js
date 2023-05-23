import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Admin from "../models/Admin.js"
import {generarJWTAdmin, generarIdAdmin } from '../helpers/tokens.js'
import {emailRegistroAdmin, olvidePasswordAdmin } from '../helpers/emails.js'

//vista formulario Login
const formularioLoginAdmin = (req,res)=> {
    res.render('auth/login-admin', {
        pagina: 'Iniciar Sesión Administradores',
        csrfToken: req.csrfToken(),
    })
}


//autenticación de login 
const autenticarLoginAdmin = async (req, res) =>{

    //validacion formulario login
    await check('email').isEmail().withMessage('El Email es Obligatorio').run(req)
    await check('password').notEmpty().withMessage('El Password es obligatorio').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/login-admin', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {email, password} = req.body

    //comprobar si el medico existe
    const admin = await Admin.findOne({where: {email}})
    if(!admin){
        //errores del formulario login
        return res.render('auth/login-admin', {
            pagina: 'Iniciar Sesión Administradores',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Administrador No Existe'}],                        
        })
    }

    //Comprobar si el Medico esta confirmado
    if(!admin.confirmado){
        //errores del formulario login
        return res.render('auth/login-admin', {
            pagina: 'Iniciar Sesión Administradores',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu cuenta no esta Conformada'}],                        
        })
    }

    //Revisar el Password
    if(!admin.verificarPassword(password)){
        return res.render('auth/login-admin', {
            pagina: 'Iniciar Sesión Administradores',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El password es Incorrecto'}],                        
        })
    }

    //autenticar al usuario
    const token = generarJWTAdmin({id: admin.id, nombre: admin.nombre})

    console.log(token)

    //almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true,
        //sameSite: true
    }).redirect('/menu-admin')   

}

const formularioRegistroAdmin = (req, res) => {    

        res.render('auth/registro-admin', {
        pagina: 'Crear Cuenta Admin',
        csrfToken: req.csrfToken(),
        barra: 'true',
    })   
    
}


//registrar medico
const registrarAdmin = async(req, res) => {
    //validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellidos').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('documento').notEmpty().withMessage('El documento es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)            
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req)
    


    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/registro-admin', {
            pagina: 'Crear Cuenta Admin',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            barra:true,            
            //autollenado del formurio
            admin:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,               
                
            }
        })
    }


    //verificar si el admin ya esta registrado existe
    //extraer los datos
    const {nombre, apellidos, documento, email, password} = req.body;

    //verificar que el admin ya existe
    const existeAdmin = await Admin.findOne({ where: { documento } })    
    if(existeAdmin){
        return res.render('auth/registro-admin', {
            pagina: 'Crear Cuenta Admin',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El admin ya esta registrado'}],
            //autollenado del formurio medico
            admin:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,               
            }
        })
    } 
    
    
    //almacenar un usuario
    const admin = await Admin.create({
        nombre,
        apellidos,
        documento,
        email,            
        password,
        token: generarIdAdmin()
    })

    
    //envia email de confirmacion
    emailRegistroAdmin({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        email: req.body.email,            
        token: admin.token
    })
    //mostrar mensaje de confirmacion

    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación, presiona en el enlace'
    })

}


//funcion que comprueba una cuenta
const confirmarAdmin = async (req, res) => {
    const{token} = req.params;
    

    //verificar si el token es valido
    const admin = await Admin.findOne({where: {token}})

    if(!admin){
        return res.render('auth/confirmar-cuenta-admin', {
            pagina: 'Error al Confirmar la Cuenta',
            mensaje: 'Hubo un error al confirmar la cuenta, intenta de nuevo',
            error: true
        })  
    }
    //confirmar la cuenta
    admin.token = null;
    admin.confirmado = true;
    await admin.save();

    res.render('auth/confirmar-cuenta-admin', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente'        
    })  
}

const formularioOlvidePasswordAdmin = (req, res) =>{
    res.render('auth/olvide-password-admin', {
        pagina: 'Recupera acceso al Consultorio Medico',
        csrfToken: req.csrfToken(),
    })
}

const resetPasswordAdmin = async (req,res) =>{

    //validaciones reset password    
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    
    let resultado = validationResult(req)

    //verificar que el resultado de las validaciones este vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/olvide-password-admin', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    //buscar al usuario
    const {email} = req.body;
    const admin = await Admin.findOne({where: {email}})
    if(!admin){
        return res.render('auth/olvide-password-admin', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Email no Pertenece a Ningún Administrador'}]
        })
    }

    //generar token y enviar el email.
    admin.token = generarIdAdmin();
    await admin.save();

    //enviar un email
    olvidePasswordAdmin({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        email: req.body.email,        
        token:  admin.token
    })

    //rendirizar un mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece Tu Password',
        mensaje: 'Hemos Enviado un Email con las instrucciones.'
    })

}

const comprobarTokenAdmin = async (req, res) => {
    const {token} = req.params

    const admin = await Admin.findOne({where: {token}})

    if(!admin){
        return res.render('auth/confirmar-cuenta-admin', {
            pagina: 'Restablece Tu Password',
            mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        })  
    }

    //mostrar formulario para modificar el password
    res.render('auth/reset-password-admin', {
        pagina: 'Restablece tu Password',
        csrfToken: req.csrfToken()

    })
}

const nuevoPasswordAdmin = async(req, res) =>{
    //validar el password
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/reset-password-admin', {
            pagina: 'Restablece Tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {token} = req.params
    const {password} = req.body

    //Identificar quien hace el cambio
    const admin = await Admin.findOne({where: {token}})
    
    //hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password, salt);
    admin.token = null

    await admin.save()
    
    res.render('auth/confirmar-cuenta-admin', {
        pagina: 'Password Restablecido',
        mensaje: 'El password se Guardó correctamente'        
    })  
}










export {
    formularioLoginAdmin,
    autenticarLoginAdmin,
    formularioRegistroAdmin,
    registrarAdmin,
    confirmarAdmin,
    formularioOlvidePasswordAdmin,
    resetPasswordAdmin,
    comprobarTokenAdmin,
    nuevoPasswordAdmin

}
