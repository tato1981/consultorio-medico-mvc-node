import jwt from "jsonwebtoken"
import {Admin} from "../models/index.js"

const protegerRutaAdmin = async (req, res, next) =>{

    
    //verificar si hay un token
    const {_token}= req.cookies
    if(!_token){
        return res.redirect('auth/login-admin')
    }    

    //comprobar el token
    
    try {

    const  decoded = jwt.verify(_token, process.env.JWT_SECRET) 
        const admin= await Admin.scope('eliminarPassword').finByPk(decoded.id)

        //almacenar al usuario al req
        if(admin){
            req.admin = admin
            
        }else{
            return res.redirect('auth/login-admin')
        } 
        
        
      
        return  next()

        
        
    } catch (error) {
        return res.clearCookie('_token').redirect('auth/login-admin')
    }   
    


   

}

export default protegerRutaAdmin  