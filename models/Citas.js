import {DataTypes} from 'sequelize'
import db from '../config/db.js'

//tabla usuarios
const Cita = db.define('cita', {
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
            type: DataTypes.DATE,
            allowNull: false
        },
        edad: {
            type: DataTypes.STRING,
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
        especialidad:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_cita:{
            type: DataTypes.DATE,
            allowNull: false
        },
        hora_cita:{
            type: DataTypes.TIME,
            allowNull: false
        },

        

});



export default Cita;