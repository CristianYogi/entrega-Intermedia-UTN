
const mongoose = require("mongoose")

const uri = process.env.db_uri

const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options, (err) => {
        err ? console.log("atlas no se conecto") : console.log("atlas conectado")
})


