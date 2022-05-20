const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true, unique: false},
},
    {timestamps: true} //crea campos de el momento en que fue creado o actualizado
)



const Message = mongoose.model("Message", MessageSchema, "Message")

module.exports = Message


