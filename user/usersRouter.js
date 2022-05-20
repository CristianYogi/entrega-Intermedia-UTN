const router = require("express").Router()

const { getAllUsers, registerUser } = require("./usersController")



router.get("/", getAllUsers)

router.post("/", registerUser)

module.exports = router

