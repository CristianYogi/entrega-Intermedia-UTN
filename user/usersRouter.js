const router = require("express").Router()

const { getAllUsers, registerUser , formUsuario} = require("./usersController")



router.get("/", getAllUsers)

router.get("/register", formUsuario)

router.post("/register", registerUser)

module.exports = router

