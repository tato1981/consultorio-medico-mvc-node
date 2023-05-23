
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from "../models/Usuario.js"
import {generarJWT, generarId } from '../helpers/tokens.js'
import {emailRegistro, olvidePasswordUsuario} from '../helpers/emails.js'




//controlador del aplicativo
const formularioLoginUsuario = (req,res)=> {
    res.render('auth/login-usuario', {
        pagina: 'Iniciar Sesión Usuarios',
        csrfToken: req.csrfToken(),
    })
}

const autenticarLoginUsuario = async (req, res) =>{
    //validacion formulario login
    await check('email').isEmail().withMessage('El Email es Obligatorio').run(req)
    await check('password').notEmpty().withMessage('El Password es obligatorio').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/login-usuario', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {email, password} = req.body

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({where: {email}})
    if(!usuario){
        //errores del formulario login
        return res.render('auth/login-usuario', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Usuario No Existe'}],                        
        })
    }

    //Comprobar si el Usuario esta confirmado
    if(!usuario.confirmado){
        //errores del formulario login
        return res.render('auth/login-usuario', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'Tu cuenta no esta Conformada'}],                        
        })
    }

    //Revisar el Password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login-usuario', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El password es Incorrecto'}],                        
        })
    }

    //autenticar al usuario
    const token = generarJWT({id: usuario.id, nombre: usuario.nombre})

    console.log(token)

    //almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true,
        //sameSite: true
    }).redirect('/menu-usuarios')
    

}

const formularioRegistroUsuario = (req,res)=> {

        res.render('auth/registro-usuario', {
        pagina: 'Crear Cuenta Usuario',
        csrfToken: req.csrfToken(),
        barra: true,
    })
}

//registrar usuario
const registrar = async(req, res) => {
    //validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellidos').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('documento').notEmpty().withMessage('El documento es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    await check('telefono').notEmpty().withMessage('El teléfono es').run(req)       
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req)
    

    //validacion registros ussuarios
    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/registro-usuario', {
            pagina: 'Crear Cuenta Usuario',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            //autollenado del formurio
            usuario:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,
                telefono: req.body.telefono,
            }
            
            
        })

        
    }    

    //verificar si el usuario existe
    //extraer los datos
    const {nombre, apellidos, documento, email, telefono, password} = req.body;

    

    //verificar que el usuario ya existe
    const existeUsuario = await Usuario.findOne({ where: { email } })    
    if(existeUsuario){
        return res.render('auth/registro-usuario', {
            pagina: 'Crear Cuenta Usuario',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya esta registrado'}],
            //autollenado del formurio
            usuario:{
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                documento: req.body.documento,
                email: req.body.email,
                telefono: req.body.telefono,
            }
        })
    }   
    
    //almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        apellidos,
        documento,
        email,
        telefono,
        password,        
        token: generarId()
    })

    //envia email de confirmacion
    emailRegistro({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        email: req.body.email,
        telefono: req.body.telefono,
        token: usuario.token
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
    const usuario = await Usuario.findOne({where: {token}})
        console.log(token)
    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al Confirmar la Cuenta',
            mensaje: 'Hubo un error al confirmar la cuenta, intenta de nuevo',
            error: true
        })
        
    }
    //confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente'        
    })  
}


const formularioOlvidePasswordUsuario = (req,res)=> {
    res.render('auth/olvide-password-usuario', {
        pagina: 'Recupera acceso al Consultorio Medico',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async (req,res) =>{

    //validaciones reset password    
    await check('email').isEmail().withMessage('Eso no parece un email valido').run(req)
    
    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/olvide-password-usuario', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    //buscar al usuario
    const {email} = req.body;
    const usuario = await Usuario.findOne({where: {email}})
    if(!usuario){
        return res.render('auth/olvide-password-usuario', {
            pagina: 'Recupera acceso al Consultorio Medico',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El Email no Pertenece a Ningún Usuario'}]
        })
    }

    //generar token y enviar el email.
    usuario.token = generarId();
    await usuario.save();

    //enviar un email
    olvidePasswordUsuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        email: req.body.email,
        telefono: req.body.telefono,
        token:  usuario.token
    })

    //rendirizar un mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece Tu Password',
        mensaje: 'Hemos Enviado un Email con las instrucciones.'
    })

}

const comprobarTokenUsuario = async (req, res) => {
    const {token} = req.params

    const usuario = await Usuario.findOne({where: {token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Restablece Tu Password',
            mensaje: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        })  
    }

    //mostrar formulario para modificar el password
    res.render('auth/reset-password-usuario', {
        pagina: 'Restablece tu Password',
        csrfToken: req.csrfToken()

    })

}

const nuevoPasswordUsuario = async(req, res) =>{
    //validar el password
    await check('password').isLength({min: 6}).withMessage('El password debe ser mayor a 6 caracteres').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado de las validacioneseste vacio
    if(!resultado.isEmpty()){
    //errores del formulario
        return res.render('auth/reset-password-usuario', {
            pagina: 'Restablece Tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
                        
        })
    }

    const {token} = req.params
    const {password} = req.body

    //Identificar quien hace el cambio
    const usuario = await Usuario.findOne({where: {token}})
    
    //hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null

    await usuario.save()
    
    res.render('auth/confirmar-cuenta', {
        pagina: 'Password Restablecido',
        mensaje: 'El password se Guardó correctamente'        
    })  

}


//las funciones
export {
    formularioLoginUsuario,
    autenticarLoginUsuario,
    formularioRegistroUsuario,
    registrar,
    confirmar,
    formularioOlvidePasswordUsuario,
    resetPassword,
    comprobarTokenUsuario,
    nuevoPasswordUsuario,
}

