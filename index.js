//los archivos creado llevan la extension y los instalados no

import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import menuUsuarioRouter from './routes/menuUsuarioRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import medicoRoutes from './routes/medicoRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import menuMedicoRouter from './routes/menuMedicoRouter.js'
import menuAdminRouter from './routes/menuAdminRoutes.js'
import db from './config/db.js'

//crear la app
const app = express()

//habilitar lectura de datos del formularios
app.use(express.urlencoded({extended: true}))

//habilitar cookie Parser
app.use(cookieParser())

//habilitar el CSRF
app.use(csrf({cookie: true}))


//conexion a la base de datos
try {
    await db.authenticate();
    db.sync() //sync se encarga de crear la tabla
    console.log('Conexión Correcta a la base de datos')
} catch (error) {
    console.log(error).redirect('/menu-admin/404')
}


//habilitar pug
app.set('view engine', 'pug')
app.set('views', './views')

//carpeta publica
app.use(express.static('public'))



//Routes
app.use('/', menuUsuarioRouter)
app.use('/auth', usuarioRoutes)
app.use('/auth', medicoRoutes)
app.use('/auth', adminRoutes)
app.use('/', menuMedicoRouter)
app.use('/', menuAdminRouter)





//definir puerto y arrancar el proyecto
const port = process.env.PORT || 1000;

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})

