//Proteccion rutas Admins

import jwt from "jsonwebtoken"
import {Admin} from "../models/index.js"

const protegerRutaAdmin = async (req, res, next) => {
    // Verificar si hay un token
    const { _token } = req.cookies
    if(!_token) {
        return res.redirect('/auth/login-admin')
    }
    
    // Comprobar el Token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        const admin = await Admin.scope('eliminarPassword').findByPk(decoded.id)
        // Almacenar el usuario al Req
        if(admin) {
            req.admin = admin
        }  else {
            return res.redirect('/auth/login-admin')
        }
        return next();
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login-admin')
    }
}

export default protegerRutaAdmin