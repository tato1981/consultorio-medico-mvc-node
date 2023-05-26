import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import Medico from '../models/Medico.js'
import Paciente from '../models/Paciente.js'
import Cita from '../models/Cita.js'
import Admin from '../models/Admin.js'

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//crud pacientes

//listar pacientes
const listarPacientes = async (req,res) =>{

    const pacientes = await Paciente.findAll({ })

      res.render('menu-admin/listado-pacientes', {
        pagina: 'Medicos Registrados',
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
        return res.redirect('/menu-admin/admin')
    }


    const [pacientes] = await Promise.all([  
        Paciente.findAll()
    ])

    res.render('menu-admin/editarPacientes', {
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
    
        return res.render('menu-admin/editarPacientes', {
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
        return res.redirect('/menu-admin/admin')
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

        res.redirect('/menu-admin/listado-pacientes')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar pacientes
const eliminarPacientes = async (req, res) => {
    const {id} = req.params

    const pacientes = await Paciente.findByPk(id)

    if(!pacientes) {
        return res.redirect('/menu-admin/listado-pacientes')
    }

        // Eliminar la propiedad
    await pacientes.destroy()
    res.redirect('/menu-admin/listado-pacientes')

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//crud admins
//listar citas
const listarAdmins = async (req,res) =>{

    const admins = await Admin.findAll({ })

      res.render('menu-admin/listado-admins', {
        pagina: 'Administradores Registrados',
        csrfToken: req.csrfToken(),      
        barra: 'true',
        admins,

    })  
}


 //editar cita

const  editarAdmins = async (req, res) =>{

    const {id} = req.params

    //validar se el paciente existe
    const admin = await Admin.findByPk(id)

    if(!admin){
        return res.redirect('/menu-admin/admin')
    }


    const [admins] = await Promise.all([  
        Admin.findAll()
    ])

    res.render('menu-admin/editarAdmins', {
        pagina: `Editar admis: ${admin.nombre}`,
        csrfToken: req.csrfToken(),
        barra: true,
        admins,
        admin
    })   

}

const guardarCambiosAdmins = async (req,res) =>{

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        const [admin] = await Promise.all([  
            Admin.findAll()
        ])
    
        return res.render('menu-admin/editarAdmins', {
                pagina: 'Editar Admins',
                csrfToken: req.csrfToken(),
                barra: true,
                admin,
                errores: resultado.array(),
                admin: req.body
        })

    }

    const {id} = req.params

    //validar si el admin existe
    const admin = await Admin.findByPk(id)

    if(!admin){
        return res.redirect('/menu-admin/admin')
    }

    //reescribir la cita y guardarla

    try {
        const {nombre, apellidos, documento, email} = req.body;

        admin.set({
            nombre,
            apellidos,
            documento,            
            email,
            
        })

        await admin.save();

        res.redirect('/menu-admin/listado-admins')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar admin
const eliminarAdmins = async (req, res) => {
    const {id} = req.params

    const admins = await Admin.findByPk(id)

    if(!admins) {
        return res.redirect('/menu-admin/listado-admins')
    }

        // Eliminar la propiedad
    await admins.destroy()
    res.redirect('/menu-admin/listado-admins')

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//crud citas
//listar citas
const listarCitas = async (req,res) =>{

    const citas = await Cita.findAll({ })

      res.render('menu-admin/listado-citas', {
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
        return res.redirect('/menu-admin/admin')
    }


    const [citas] = await Promise.all([  
        Cita.findAll()
    ])

    res.render('menu-admin/editarCitas', {
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
    
        return res.render('menu-admin/editarCitas', {
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
        return res.redirect('/menu-admin/admin')
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

        res.redirect('/menu-admin/listado-citas')


    } catch (error) {
        console.log(error)
        
    }

}

//eliminar cita
const eliminarCitas = async (req, res) => {
    const {id} = req.params

    const citas = await Cita.findByPk(id)

    if(!citas) {
        return res.redirect('/menu-admin/listado-citas')
    }

        // Eliminar la propiedad
    await citas.destroy()
    res.redirect('/menu-admin/listado-citas')

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//las funciones
export {
    admin,    
    listarUsuarios,
    editarUsuarios,
    guardarCambios,
    eliminarUsuarios,
    //crud medicos
    listarMedicos,
    editarMedicos,
    guardarCambiosMedico,
    eliminarMedicos,
    //crud pacientes
    listarPacientes,
    editarPacientes,
    guardarCambiosPacientes,
    eliminarPacientes,    
    //crud admins
    listarAdmins,
    editarAdmins,
    guardarCambiosAdmins,
    eliminarAdmins,
    //crud citas
    listarCitas,
    editarCitas,
    guardarCambiosCitas,
    eliminarCitas,


}

