import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.js'
import {SignJWT} from 'jose'
import validarCampos from '../middlewares/validar-campos.js'

const appAuthToken = Router()

appAuthToken.post('/auth/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)





// const id = usuario._id

//     //Crear JWT

//  const encoder = new TextEncoder()

// const jwtConstructor = new SignJWT({id})

// const jwt = await jwtConstructor.setProtectedHeader({alg: 'HS256', typ: 'JWT'}).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

export default appAuthToken