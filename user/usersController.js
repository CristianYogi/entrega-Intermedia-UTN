const { send } = require("express/lib/response")
const {User} = require("./usersModel")

const {hashPassword, checkPassword} = require("../utlis/passwordHandler")

const formUsuario = (req,res,next) => {

    res.render("registrarUsuario.ejs", {datos : ""})

}


//TRAER TODO LOS USUARIOS
const getAllUsers = async (req, res, next) => {

    try {
        const userData = {
            __v: 0,
            // password: 0, muestro la contraseña para que se vea el hash
            createdAt: 0,
            updatedAt: 0
        }
        const result = await User.find({}, userData)

        if(result.length){
            res.render("mostrarUsuarios.ejs", {datos: {result}})   
        }else{
            next()
        }
        
    } catch (error) {
        error.status(500)
        error.message("Internal Server Error")
        next(error)
    }

}

const getUserById = async(req, res, next) => {
    try {
        const result = await User.findById(req.params.id)

        if(result.length){
            res.render("index.ejs", {datos: {info : result}})
        }else{
            next()
        } 
        
    } catch (error) {
        error.status(500)
        error.message("Internal Server Error")
        next(error)
    }
}


const updateUser = async (req,res,next) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
         next()
    }
}


const registerUser = async (req, res, next) =>{

    const password = await hashPassword(req.body.password)

    const newUser = new User({...req.body, password})
    newUser.save((error, result) =>{
        if(error){
            res.send(error)
        }else{
            res.render("index.ejs", {datos: {info: "Usuario Registrado"}})
        }
    })

}

const deleteUser = async (req,res,next) => {
    try {
        const result = await User.findOneAndDelete(req.params.id)
        
        !result ? next(): res.status(200).json({message: "Usuario Eliminado.", result})
        
    } catch (error) {
        error.status(500)
        error.message("Interal Server Error")
        next(error)
    }
}

module.exports = { getAllUsers, registerUser ,formUsuario, getUserById, updateUser, deleteUser}