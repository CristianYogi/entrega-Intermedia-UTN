const {send} = require("express/lib/response")
const {User} = require("./usersModel")

const {hashPassword, checkPassword} = require("../utlis/passwordHandler")

const {tokenSing, tokenVerify} = require("../utlis/jwt")

const formUsuario = (req, res, next) => {

    res.render("registrarUsuario.ejs", {datos: ""})

}


// TRAER TODO LOS USUARIOS
const getAllUsers = async (req, res, next) => {

    try {
        const userData = {
            __v: 0,
            // password: 0, muestro la contraseña para que se vea el hash
            createdAt: 0,
            updatedAt: 0
        }
        const result = await User.find({}, userData)

        if (result.length) {
            res.render("mostrarUsuarios.ejs", {datos: {
                    result
                }})
        } else {
            next()
        }

    } catch (error) {
        error.status = '500'
        error.message = 'Internal Server Error'
        next()
    }

}

const getUserById = async (req, res, next) => {
    try {
        const result = await User.findById(req.params.id)

        if (result) {
            res.render("index.ejs", {
                datos: {
                    info: result
                }
            })
        } else {

            return next()
        }

    } catch (error) {
        error.status = '500'
        error.message = 'Internal Server Error'
        next()
    }
}


const updateUser = async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
        error.status = '500'
        error.message = 'Internal Server Error'
        next()
    }
}


const registerUser = async (req, res, next) => {

    const password = await hashPassword(req.body.password)

    const newUser = new User({
        ...req.body,
        password
    })
    newUser.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.render("index.ejs", {
                datos: {
                    info: "Usuario Registrado"
                }
            })
        }
    })

}

const deleteUser = async (req, res, next) => {
    try {
        const result = await User.findOneAndDelete(req.params.id)

        ! result ? next() : res.status(200).json({message: "Usuario Eliminado.", result})

    } catch (error) {
        error.status = 500
        error.message = "Interal Server Error"
        next(error)
    }
}

const login = async (req, res, next) => {


    try {
        const result = await User.find({userName: req.body.userName})

        if (result.length) {
            if (await checkPassword(req.body.password, result[0].password)) {
                const user = {
                    id: result[0]._id,
                    name: result[0].name,
                    email: result[0].email
                }

                const tokenData = {
                    token: await tokenSing(user, '2h'),
                    user
                }

                res.status(200).json({message: `Te logeaste como ${
                        user.name
                    }.`, Token_Info: tokenData})

            } else {
                let error = new Error("Contraseña incorrecta")
                error.status = 401
                next(error)
            }

        } else {
            return next()
        }


    } catch (error) {
        console.log(error)
        error.status = 500
        next(error)
    }


}


module.exports = {
    getAllUsers,
    registerUser,
    formUsuario,
    getUserById,
    updateUser,
    deleteUser,
    login
}
