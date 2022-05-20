const { send } = require("express/lib/response")
const {User} = require("./usersModel")


const formUsuario = (req,res,next) => {

    res.render("registrarUsuario.ejs")

}


//TRAER TODO LOS USUARIOS
const getAllUsers = async (req, res, next) => {

    try {
        const result = await User.find()
        res.render("mostrarUsuarios.ejs", {datos: {result}})   
    } catch (error) {
        res.status(500).json({message: "Error interno del Servidor"})
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

module.exports = { getAllUsers, registerUser ,formUsuario}