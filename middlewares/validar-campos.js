import { response } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        res.status(401).json(errores)
    }

    next()
}

export default validarCampos