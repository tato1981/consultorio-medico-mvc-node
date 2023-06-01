import { check, validationResult } from 'express-validator'
import Medico from "../models/Medico.js"
import Cita from '../models/Cita.js'

const admin = (req,res) => {
    res.render('menu-medicos/admin', {
        pagina: 'Menu Principal Medicos',
        barra: 'true',
        
    })
}

//crud citas
//listar citas
const listarCitas = async (req,res) =>{

    const citas = await Cita.findAll({ })

      res.render('menu-medicos/listado-citas', {
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

    res.render('menu-medicos/editarCitas', {
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
    
        return res.render('menu-medicos/editarCitas', {
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

        res.redirect('/menu-medicos/listado-citas')


    } catch (error) {
        console.log(error)
        
    }

}

///eliminar cita
const eliminarCitas = async (req, res) => {
    const {id} = req.params

    const citas = await Cita.findByPk(id)

    if(!citas) {
        return res.redirect('/menu-medicos/listado-citas')
    }

        // Eliminar la propiedad
    
    await citas.destroy()
    res.redirect('/menu-medicos/listado-citas')

}
//registro historias clinicas
const formularioRegistroHistoriaClinica = (req, res) =>{
    
        res.render('menu-medicos/registroHistoriaClinica', {
        pagina: 'Registro Historia Clínica',
        csrfToken: req.csrfToken(),
        barra: 'true',
       
      
    })
}

//registro formulas medicas

const formularioRegistroFormulaMedica = (req, res) =>{
    
        res.render('menu-medicos/registroFormulaMedica', {
        pagina: 'Registro Formulas Medicas',
        csrfToken: req.csrfToken(),
        barra: 'true',
       
      
    })
}


//registro incapacidades medicas

const registroIncapacidadMedica = (req, res) =>{
    
        res.render('menu-medicos/registroIncapacidadMedica', {
        pagina: 'Registro Incapacidad Medica',
        csrfToken: req.csrfToken(),
        barra: 'true',
       
      
    })
}











export{
    admin,
    listarCitas,
    editarCitas,
    guardarCambiosCitas,
    eliminarCitas,
    //confirmarDelete,
    formularioRegistroHistoriaClinica,
    formularioRegistroFormulaMedica,
    registroIncapacidadMedica,

    
}