import { check, validationResult } from 'express-validator'
import Medico from "../models/Medico.js"

const admin = (req,res) => {
    res.render('menu-medicos/admin', {
        pagina: 'Menu Principal Medicos',
        barra: 'true',
        
    })
}



export{
    admin,
    
}