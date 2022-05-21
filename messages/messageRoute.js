const router = require("express").Router()
const { render } = require("express/lib/response")

const isAuth = require("../middleware/isAuth")

const {postMessage, getAllMessages} = require ("./messageController")


router.get("/", getAllMessages)

router.post("/post", isAuth ,postMessage)

module.exports = router