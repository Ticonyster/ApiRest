import usuario from "../models/usuario.js";
import Usuario from "../models/usuario.js";

export const validarEmail = async(email) => {

    const emailExiste = await Usuario.findOne({email})

    if(emailExiste){
        throw new Error('El correo que ingresaste ya está registrado')
    }
}

export const verificarId = async(id) => {

    const buscarId = await Usuario.findById(id)

    if(!buscarId){
        throw new Error('Disculpa, pero no pudimos encontrar ningún resultado con ese id, intenta con otro')
    }
} 