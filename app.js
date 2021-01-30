const express = require('express')
const router = require('./routes/routes')
const app = express()
const server = require('http').createServer(app)

const port = process.env.PORT || 3000

app.use(router)

server.listen(port, () => {
    console.log('Server running on ', port)
})