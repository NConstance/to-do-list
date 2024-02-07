// server.js
require('dotenv').config()  // gives you access to process.env

require('./config/database') // connecting database

const express = require('express') // get express

const app = express() // connecting express to the api app

const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3005


// Middleware
app.use(express.json())
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/todos', require('./routes/api/todos'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} at http://localhost:${PORT}`)
})