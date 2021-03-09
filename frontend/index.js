const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { dirname } = require("path")

const port = process.env.PORT;

const app = express()
var cors = require('cors')

app.use(cors())

const publicDirPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, "./templates/partials")

app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

// Homepage
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/drive', (req, res) => {
    res.render('drive');
})

// Start server
app.listen(port, () => {
    console.log("Server is up on " + port)
})