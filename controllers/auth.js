console.clear();
import { request, response } from "express";
import Usuario from '../models/usuario.js'
import bcrypt from 'bcrypt'
import {SignJWT} from 'jose'

export const login = async(req = request, res = response) => {

    const {email, password} = req.body

    try {

        const usuario = await Usuario.findOne({email})
        
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o contraseña son incorrectos - correo'
            })
        }

        //Verificar el estado
        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o contraseña son incorrectos'
            })
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contraseña son incorrectos'
            })
        }

        //Crear JWT
        const id = usuario._id

        const encoder = new TextEncoder()

        const jwtConstructor = new SignJWT({id})

        const jwt = await jwtConstructor.setProtectedHeader({alg: 'HS256', typ: 'JWT'}).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

        res.json({
            msg: 'Todo ok - login',
            jwt
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error...'
        })
    }

}

