import {exit} from "node:process"
import usuarios from "./usuarios.js";
import medicos from "./medicos.js";
import admins from "./admins.js";
import db from "../config/db.js";
import {Usuario, Medico, Admin} from "../models/index.js"

const importarDatos = async () =>{
    try {
        //autenticar
        await db.authenticate()
        //generar las columnas
        await db.sync()
        //insertar los datos
        await Usuario.bulkCreate(usuarios)
        await Medico.bulkCreate(medicos)
        await Admin.bulkCreate(admins)
        console.log('Datos Importados correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async () =>{
    try {
        //await Promise.all([
           // Cita.destroy({where: {}, truncate: true} ),
           // Medico.destroy({where: {}, truncate: true} ),
           // Paciente.destroy({where: {}, truncate: true} ),
            //Usuario.destroy({where: {}, truncate: true} )
       // ])
        await db.sync({force: true})
        console.log('Datos eliminados Correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos()
}

if(process.argv[2] === "-e"){
    eliminarDatos()
}