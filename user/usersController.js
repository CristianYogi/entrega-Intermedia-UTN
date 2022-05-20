const { send } = require("express/lib/response")
const {User} = require("./usersModel")


const formUsuario = (req,res,next) => {

    res.render("registrarUsuario.ejs")

}


//TRAER TODO LOS USUARIOS
const getAllUsers = async (req, res, next) => {

    try {
        const userData = {
            __v: 0,
            password: 0,
            createdAt: 0,
            updatedAt: 0
        }
        const result = await User.find({}, userData)
        res.render("mostrarUsuarios.ejs", {datos: {result}})   
    } catch (error) {
        res.status(500).json({message: "Error interno del Servidor"})
    }

}

const getUserById = async(req, res, next) => {
    try {
        const result = await User.findById(req.params.id)
        res.render("index.ejs", {datos: {usuario : result}})
    } catch (error) {
        res.status(404).json(error)
    }
}


const updateUser = async (req,res,next) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
         res.status(404).json(error)
    }
}


const registerUser = async (req, res, next) =>{

    const newUser = new User({...req.body})
    newUser.save((error, result) =>{
        if(error){
            res.send(error)
        }else{
            res.render("index.ejs")
        }
    })

}

const deleteUser = async (req,res,next) => {
    try {
        const result = await User.findOneAndDelete(req.params.id)
        
        res.status(200).json({message: "Usuario Eliminado.", result})
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = { getAllUsers, registerUser ,formUsuario, getUserById, updateUser, deleteUser}