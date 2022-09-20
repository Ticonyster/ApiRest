import express, { response } from 'express'
import { check } from 'express-validator'
import { actualizarUsuario, eliminarUsuario, crearUsuario, obtenerUsuarios, obtenerUsuariosPorId } from '../controllers/usuarios.js'
import { validarEmail, verificarId } from '../helpers/db-validators.js'
import validarCampos from '../middlewares/validar-campos.js'

const appExpress = express.Router()

appExpress.use(express.json())

appExpress.get('/usuarios', obtenerUsuarios)

appExpress.get('/usuarios/:id', obtenerUsuariosPorId)

appExpress.post('/crear-usuario', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo que ingresaste no es válido').isEmail(),
    check('password', 'La contraseña debe contener más de 6 dígitos').isLength({min: 6}),
    check('email').custom(validarEmail),
    validarCampos
], crearUsuario)

appExpress.put('/actualizar-usuario/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(verificarId),
    validarCampos
], actualizarUsuario)

appExpress.delete('/eliminar-usuario/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(verificarId),
    validarCampos
], eliminarUsuario)

export default appExpress