import jwt from "jsonwebtoken"
import {Medico} from "../models/index.js"

const protegerRutaMedico = async (req, res, next) =>{
    
    //verificar si hay un token
    const {_token}= req.cookies
    if(!_token){
        return res.redirect('auth/login-medico')
    }    

    //comprobar el token
    /*
    try {

       const  decoded = jwt.verify(_token, process.env.JWT_SECRET) 
        const medico = await Medico.scope('eliminarPassword').finByPk(decoded.id)

        //almacenar al usuario al req
        if(medico){
            req.medico = medico
            
        }else{
            return res.redirect('auth/login-medico')    
        
        }        
        
        return  next()        
        
    } catch (error) {
        return res.clearCookie('_token').redirect('auth/login-medico')
    } 
    */

}

export default protegerRutaMedico;  