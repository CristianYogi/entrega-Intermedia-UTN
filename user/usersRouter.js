const router = require("express").Router()

const { render } = require("express/lib/response")
const { validatorCreateUser } = require("../validator/registerValidation")
const { getAllUsers, registerUser , formUsuario, getUserById, updateUser, deleteUser} = require("./usersController")


//OBTENER USUARIO
router.get("/", getAllUsers)


//REGISTRAR UN USUARIO, ME DI CUENTA A MITAD DE CAMINO QUE NO HACIA FALTA FORMULARIO
router.get("/register", formUsuario)

router.post("/register", validatorCreateUser, registerUser)


router.get("/:id", getUserById)


router.put("/:id", updateUser)


router.delete("/:id", deleteUser)


module.exports = router

