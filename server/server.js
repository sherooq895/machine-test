const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv = require('dotenv')
const routesUrls = require('./routes/Admin')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('database connected'))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ "limit": "30mb", extended: true }));
app.use(bodyParser.urlencoded({ "limit": "30mb", extended: true }));

app.use('/api/images', express.static(path.join(__dirname, 'public/images')))
app.use('/api', routesUrls)

app.listen(4000, () => {
    console.log("server is up and running")
})