import jwt from "jsonwebtoken"
import {Admin} from "../models/index.js"

const protegerRuta = async (req, res, next) =>{

    
    //verificar si hay un token
    const {_token}= req.cookies
    if(!_token){
        return res.redirect('auth/login-admin')
    }    

    


   

}

export default protegerRuta  