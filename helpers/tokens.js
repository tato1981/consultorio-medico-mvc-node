
import jwt from 'jsonwebtoken'

//jwt Usuarios

const generarJWTUsuario = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarIdUsuario = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

//jwt mwdicos

const generarJWTMedico = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarIdMedico = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

//jwt administradores

const generarJWTAdmin = datos =>  jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, { expiresIn: '1d'})
const generarIdAdmin = () =>   Math.random().toString(32).substring(2) + Date.now().toString(32)

export{
    generarJWTUsuario,
    generarIdUsuario,

    generarJWTMedico,
    generarIdMedico,

    generarJWTAdmin,
    generarIdAdmin
   
    
}