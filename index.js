require("dotenv").config()
require("./db/config")

const express = require("express")

const server = express()
const path = require('path')

const port = process.env.PORT || 8000


server.use(express.static('public'))

//VIEW ENGINE
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs');


server.use(express.json())
server.use(express.urlencoded({extended: true})) 

//PRIMER RESPUESTA
server.get("/", (req, res) => {
    res.send("<h1>Mi API</h1>")
})

//USERS
server.use("/users", require("./user/usersRouter"))


server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`App corre en http://localhost:${port}`)
})

