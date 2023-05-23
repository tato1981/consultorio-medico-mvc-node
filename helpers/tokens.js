
import jwt from 'jsonwebtoken'

//jwt Usuarios

const generarJWT = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarId = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

//jwt mwdicos

const generarJWTMedico = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarIdMedico = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

//jwt administradores

const generarJWTAdmin = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarIdAdmin = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

export{
    generarJWT,
    generarId,

    generarJWTMedico,
    generarIdMedico,

    generarJWTAdmin,
    generarIdAdmin
   
    
}