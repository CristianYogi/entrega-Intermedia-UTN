const router = require("express").Router()

const { render } = require("express/lib/response")
const { validatorCreateUser , validatorLoginUser} = require("../validator/formsValidator")
const { getAllUsers, registerUser , formUsuario, getUserById, updateUser, deleteUser, login} = require("./usersController")


//OBTENER USUARIO
router.get("/", getAllUsers)


//REGISTRAR UN USUARIO, ME DI CUENTA A MITAD DE CAMINO QUE NO HACIA FALTA FORMULARIO
router.get("/register", formUsuario)

router.post("/register", validatorCreateUser, registerUser)

//LOGIN
router.get("/login", (req, res) => {
    res.render("login.ejs", {datos : ""})
})

router.post("/login", validatorLoginUser, login)


router.get("/:id", getUserById)


router.put("/:id", updateUser)


router.delete("/:id", deleteUser)



module.exports = router

