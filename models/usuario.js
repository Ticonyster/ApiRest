import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    }
})

usuarioSchema.methods.toJSON = function() {
    const {__v, password, email, rol, ...usuario} = this.toObject()
    return usuario
}

export default mongoose.model('Usuario', usuarioSchema)