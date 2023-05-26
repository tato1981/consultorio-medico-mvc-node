import {DataTypes} from 'sequelize'
import db from '../config/db.js'

//tabla usuarios
const Paciente = db.define('paciente', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos:{
            type: DataTypes.STRING,
            allowNull: false
        },
        documento:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false
        },
        servicio_medico:{
            type: DataTypes.STRING,
            allowNull: false
        },
        

});



export default Paciente;