console.clear()
import { request, response } from "express"
import Usuario from '../models/usuario.js'
import bcrypt from 'bcrypt'


const obtenerUsuarios = async(req, res = response) => {
    const query = {estado: true}
    
    const usuario = await Usuario.find(query)

    //console.log(query);
    res.json({usuario})

}

const obtenerUsuariosPorId = async(req, res = response) => {

    const { id } = req.params
    const usuario = await Usuario.findById(id)

    res.json({
        usuario
    })

}

const crearUsuario = async(req = request, res = response) => {
    
    try {
        const {nombre, email, password} = req.body
        const usuario = new Usuario({nombre, email, password})

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
    
        await usuario.save()
        
        res.json({
        msg: 'Usuario creado con éxito',
        })

    } catch (error) {
        console.log(error)
        throw new Error('Ha ocurrido un error')
    }

}

const actualizarUsuario = async(req, res = response) => {

    const { id } = req.params
    const {password, ...body} = req.body

    if(password){
        const salt = bcrypt.genSaltSync()
        body.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, body)

    res.json({
        msg: 'Usuario actualizado exitosamente',
        id
    })

}

const eliminarUsuario = async(req, res = response) => {
    
    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: 'El usuario ha sido eliminado existosamente', usuario
    })

}

export {obtenerUsuarios, obtenerUsuariosPorId, crearUsuario, actualizarUsuario, eliminarUsuario}