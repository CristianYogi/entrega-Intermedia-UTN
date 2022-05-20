const router = require("express").Router()

const { getAllUsers, registerUser , formUsuario} = require("./usersController")



router.get("/", getAllUsers)

router.get("/registrar", formUsuario)

router.post("/", registerUser)

module.exports = router

