
import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_DATABASE, process.env.BD_USER, process.env.BD_PASSWORD,{
     host: process.env.BD_HOST,
     port: process.env.DB_PORT,
     dialect: 'mysql',
     define:{
        timestamps: true, //cuendo un usuario se registra agrega dos columnas por defecto 
                        //cuando fue creado o actualizado el registro
     },
     pool: { //pool confugura como va hacer el comportamiento para conexiones nuevas
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     },
     operatorAliases: false,
});

export default db;

