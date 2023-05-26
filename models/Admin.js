import {DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

//tabla usuarios
const Admin = db.define('Admins', {
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
    password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token: DataTypes.STRING,
        confirmado: DataTypes.BOOLEAN

}, {
    hooks: {
        beforeCreate: async function(admins){
            const salt = await bcrypt.genSalt(10)
            admins.password = await bcrypt.hash(admins.password, salt)
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
Admin.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default Admin;