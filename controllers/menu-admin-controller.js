import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import Medico from '../models/Medico.js'

//controlador del aplicativo


const admin = (req,res) => {       
    
    res.render('menu-admin/admin', {
        pagina: 'Menu Principal Administradores',            
        barra: 'true',
        csrfToken: req.csrfToken(),           
        
    })    
}

//listar Usuarios
const listarUsuarios = async (req,res) =>{

    const usuarios = await Usuario.findAll({ })

      res.render('menu-admin/listado-usuarios', {
        pagina: 'Usuarios Registrados',
        csrfToken: req.csrfToken(),      
        barra: 'true',
        usuarios,

    })  
}

//editar Usuarios

const  editarUsuarios = async (req, res) =>{

    const {id} = req.params

    //validar se el usuario existe
    const usuario = await Usuario.findByPk(id)

    if(!usuario){
        return res.redirect('/menu-admin/admin')
    }


    const [usuarios] = await Promise.all([  
        Usuario.findAll()
    ])

    res.render('menu-admin/editarUsuarios', {
        pagina: `Editar Usuarios: ${usuario.nombre}`,
        csrfToken: req.csrfToken(),
        barra: true,
        usuarios,
        usuario
    })   

}

const guardarCambios = async (req,res) =>{

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        const [usuarios] = await Promise.all([  
            Usuario.findAll()
        ])
    
        return res.render('menu-admin/editarUsuarios', {
                pagina: 'Editar Usuarios',
                csrfToken: req.csrfToken(),
                barra: true,
                usuarios,
                errores: resultado.array(),
                usuario: req.body
        })

    }

    const {id} = req.params

    //validar se el usuario existe
    const usuario = await Usuario.findByPk(id)

    if(!usuario){
        return res.redirect('/menu-admin/admin')
    }

    //reescribir al usuario y guardarlo

    try {
        const {nombre, apellidos, documento, email, telefono} = req.body;

        usuario.set({
            nombre,
            apellidos,
            documento,
            email,
            telefono
        })

        await usuario.save();

        res.redirect('/menu-admin/listado-usuarios')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar usuarios
const eliminarUsuarios = async (req, res) => {
    const {id} = req.params

    const usuarios = await Usuario.findByPk(id)

    if(!usuarios) {
        return res.redirect('/menu-admin/listado-usuarios')
    }

        // Eliminar la propiedad
    await usuarios.destroy()
    res.redirect('/menu-admin/listado-usuarios')

}


//crud medicos

//listar medicos
const listarMedicos = async (req,res) =>{

    const medicos = await Medico.findAll({ })

      res.render('menu-admin/listado-medicos', {
        pagina: 'Medicos Registrados',
        csrfToken: req.csrfToken(),      
        barra: 'true',
        medicos,

    })  
}

//editar medicos

const  editarMedicos = async (req, res) =>{

    const {id} = req.params

    //validar se el usuario existe
    const medico = await Medico.findByPk(id)

    if(!medico){
        return res.redirect('/menu-admin/admin')
    }


    const [medicos] = await Promise.all([  
        Medico.findAll()
    ])

    res.render('menu-admin/editarMedicos', {
        pagina: `Editar Medicos: ${medico.nombre}`,
        csrfToken: req.csrfToken(),
        barra: true,
        medicos,
        medico
    })   

}

const guardarCambiosMedico = async (req,res) =>{

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        const [medicos] = await Promise.all([  
            Medico.findAll()
        ])
    
        return res.render('menu-admin/editarMedicos', {
                pagina: 'Editar Medicos',
                csrfToken: req.csrfToken(),
                barra: true,
                medicos,
                errores: resultado.array(),
                medico: req.body
        })

    }

    const {id} = req.params

    //validar se el usuario existe
    const medico = await Medico.findByPk(id)

    if(!medico){
        return res.redirect('/menu-admin/admin')
    }

    //reescribir al usuario y guardarlo

    try {
        const {nombre, apellidos, documento, email, especialidad, telefono} = req.body;

        medico.set({
            nombre,
            apellidos,
            documento,
            email,
            especialidad,
            telefono
        })

        await medico.save();

        res.redirect('/menu-admin/listado-medicos')


    } catch (error) {
        console.log(error)
        
    }

}


//eliminar medicos
const eliminarMedicos = async (req, res) => {
    const {id} = req.params

    const medicos = await Medico.findByPk(id)

    if(!medicos) {
        return res.redirect('/menu-admin/listado-medicos')
    }

        // Eliminar la propiedad
    await medicos.destroy()
    res.redirect('/menu-admin/listado-medicos')

}






//las funciones
export {
    admin,    
    listarUsuarios,
    editarUsuarios,
    guardarCambios,
    eliminarUsuarios,
    //crud admin
    listarMedicos,
    editarMedicos,
    guardarCambiosMedico,
    eliminarMedicos,

}

