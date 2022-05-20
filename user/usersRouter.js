const router = require("express").Router()

const { getAllUsers, registerUser , formUsuario} = require("./usersController")


//OBTENER USUARIO
router.get("/", getAllUsers)


//REGISTRAR UN USUARIO
router.get("/register", formUsuario)

router.post("/register", registerUser)

module.exports = router

