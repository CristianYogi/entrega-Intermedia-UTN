const { send } = require("express/lib/response")
const {User} = require("./usersModel")

const getAllUsers = async (req, res, next) => {

    try {
        const result = await User.find()
        res.status(200).json({message: "Usuarios encontrados", result})    
    } catch (error) {
        res.status(500).json({message: "Error interno del Servidor"})
    }
    

    // User.find().then((result) =>{
    //     console.log(result)
    //     res.status(200).json(result)
        
    // })
    //     .catch((err) => {
    //         res.status(404).json(err)
    //     })

}


const registerUser = async (req, res, next) =>{

    const newUser = new User({...req.body})
    newUser.save((error, result) =>{
        if(error){
            res.send(error)
        }else{
            res.status(200).json({result})
        }
    })

}

module.exports = { getAllUsers, registerUser }