const express = require('express')
const router = require('./routes/routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const createError = require('http-errors')
const path = require('path')
const app = express()
const server = require('http').createServer(app)

const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://cluster0.5xmnw.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    dbName: 'users_api',
    user: 'users_db',
    pass: 'Dinh64qjk6Exvl58',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log('connected')
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(router)

app.use((req, res, next) => {
    // const err = new Error('Not Found')
    // err.status = 404
    next(createError(404, "Not Found Route"))
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

server.listen(port, () => {
    console.log('Server running on ', port)
})