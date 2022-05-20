const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
    {timestamps: true} //crea campos de el momento en que fue creado o actualizado
)


const allUsers = async() =>{

    


}

const User = mongoose.model("User", UserSchema)

module.exports = {allUsers, User}