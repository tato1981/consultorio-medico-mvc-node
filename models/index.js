

import Cita from './Cita.js'
import Medico from './Medico.js'
import Paciente from './Paciente.js'
import Usuario from './Usuario.js'
import Admin from './Admin.js'

Medico.hasMany(Cita, { foreignKey: 'medicoId'})
Paciente.hasMany(Cita, {foreignKey: 'pacienteId'})
Usuario.hasMany(Cita, {foreignKey: 'usuarioId'})
Admin.hasMany(Cita, {foreignKey: 'adminId'})


export {
    Cita,
    Medico,
    Paciente,
    Usuario,
    Admin
}

