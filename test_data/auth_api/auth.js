const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())

// [GET] /user
app.get('/user', (req, res, next) => {
  res.json({ user: 'user' })
})

// -- export app --
module.exports = {
  path: '/',
  handler: app
}

app.listen(3000, '0.0.0.0')
