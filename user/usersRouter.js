const router = require("express").Router()

const { render } = require("express/lib/response")
const { validatorCreateUser , validatorLoginUser, validatorResetearPass} = require("../validator/formsValidator")
const { getAllUsers, registerUser , formUsuario, getUserById, updateUser, deleteUser, login, forgotPass, formResetPass, newPass} = require("./usersController")
const isAuth = require("../middleware/isAuth")

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

router.get("/pass-form", (req, res) => {
    res.render("recuperarPass.ejs", {datos: ""})
})

router.post("/forgot-pass", forgotPass)

router.get("/reset/:token", formResetPass)

router.post("/new-pass/:token", validatorResetearPass, newPass)


module.exports = router

