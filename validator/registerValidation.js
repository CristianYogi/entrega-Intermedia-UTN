const {check, validationResult} = require('express-validator')

const validatorCreateUser = [
    check("name")
        .trim()
        .isAlpha('es-ES',{ignore: ' '}).withMessage("Solo letras por favor")//HAY QUE METER LA CODIFICACION
        .exists().withMessage("El campo nombre debe existir")
        .isLength({min: 2, max: 90}).withMessage("La longitud minima es de 2 caracteres"),

    check("email")
        .normalizeEmail()
        .exists().withMessage("El campo email debe de existir")
        .isEmail().withMessage("Debe de ser un email"),
    
    check("userName")
    .trim()
    .isAlpha('es-ES',{ignore: ' '}).withMessage("Solo letras por favor")
    .exists().withMessage("El campo nombre debe existir")
    .isLength({min: 2, max: 90}).withMessage("La longitud minima es de 2 caracteres"),

    check("password")
        .trim()
        .exists().withMessage("El campo password debe de existir")
        .isLength({min: 8, max: 20}).withMessage("La contraseña debe de tener entre 8 y 20 caracteres"),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const arrWarnings = errors.array()
            res.render("registrarUsuario.ejs", {datos: {errores: arrWarnings}})
        }else{
            next()
        }
    }

    ]

module.exports = {validatorCreateUser}


