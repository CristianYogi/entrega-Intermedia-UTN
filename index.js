require("dotenv").config()
require("./db/config")
const cors = require('cors');

const express = require("express")

const server = express()
const path = require('path')

const port = process.env.PORT || 8000
server.use(cors());

server.use(express.static('public'))

//VIEW ENGINE
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs');


server.use(express.json())
server.use(express.urlencoded({extended: true})) 

//PRIMER RESPUESTA
server.get("/", (req, res) => {
    res.render("index.ejs")
})

//USERS
server.use("/users", require("./user/usersRouter"))


server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`App corre en http://localhost:${port}`)
})

