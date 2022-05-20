const express = require("express")

const server = express()
const path = require('path')

const port = process.env.PORT

server.use(express.static('public'))


server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs');

server.use(express.json())
server.use(express.urlencoded({extended: true})) 

server.get("/", (req, res) => {
    res.send("<h1>Mi API</h1>")
})



server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`App corre en http://localhost:${port}`)
})

