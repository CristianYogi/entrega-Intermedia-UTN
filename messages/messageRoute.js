const router = require("express").Router()
const { render } = require("express/lib/response")

const isAuth = require("../middleware/isAuth")

const {postMessage} = require ("./messageController")

router.post("/post", isAuth ,postMessage)

module.exports = router