import {DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

//tabla usuarios
const Medico = db.define('medicos', {
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
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
   
    password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token: DataTypes.STRING,
        confirmado: DataTypes.BOOLEAN

}, {
    hooks: {
        beforeCreate: async function(medico){
            const salt = await bcrypt.genSalt(10)
            medico.password = await bcrypt.hash(medico.password, salt)
        }
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
});

//metodos personalizados
Medico.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default Medico;