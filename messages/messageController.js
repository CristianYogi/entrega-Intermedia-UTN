
const Message = require("./messageModel")

const postMessage = async (req, res, next) => {

    const newMessage = new Message({...req.body})
    newMessage.save((error, result) =>{
        if(error){
            res.send(error)
        }else{
            res.status(200).json({message: "Se cargo correctamente"})
        }
    })

}


module.exports = {postMessage}