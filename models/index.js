

import Cita from './Citas.js'
import Medico from './Medico.js'
import Paciente from './Paciente.js'
import Usuario from './Usuario.js'

Medico.hasMany(Cita, { foreignKey: 'citaId'})
Paciente.hasMany(Cita, {foreignKey: 'citaId'})
Usuario.hasMany(Cita, {foreignKey: 'citaId'})

export {
    Cita,
    Medico,
    Paciente,
    Usuario
}

