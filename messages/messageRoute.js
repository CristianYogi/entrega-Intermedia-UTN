const router = require("express").Router()
const { render } = require("express/lib/response")

const isAuth = require("../middleware/isAuth")

const {postMessage, getAllMessages, getPostByTitle} = require ("./messageController")


router.get("/", getAllMessages)

router.get("/post/:title", getPostByTitle)

router.post("/post", isAuth ,postMessage)

module.exports = router