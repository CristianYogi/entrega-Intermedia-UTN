const { send } = require("express/lib/response")
const {User} = require("./usersModel")

const getAllUsers = async (req, res, next) => {

    User.find().then((result) =>{
        res.status(200).json(result)
    })
        .catch((err) => {
            res.status(404).json(err)
        })

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