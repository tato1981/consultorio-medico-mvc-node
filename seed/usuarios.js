import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'duberney',
        apellidos: 'obando',
        documento: 9958113,
        email: 'duberney@gmail.com',
        telefono: 3163036855,
        confirmado: 1,   
        password: bcrypt.hashSync('123456', 10)
    }
]

export default usuarios