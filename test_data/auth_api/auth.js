const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())

// JWT middleware
const jwtSecret = process.env.JWT_SECRET
app.use(
  jwt({
    secret: jwtSecret
  }).unless({
    path: '/login'
  })
)

// -- Routes --

// [POST] /login
app.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const valid = username === process.env.USER_NAME && password === process.env.PASSWORD

  if (!valid) {
    throw new Error('Invalid username or password')
  }

  const accessToken = jsonwebtoken.sign(
    {
      username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username,
      scope: ['test', 'user']
    },
    jwtSecret
  )

  res.json({
    token: {
      accessToken
    }
  })
})

// [GET] /user
app.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

// [POST] /logout
app.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// -- export app --
module.exports = {
  path: '/',
  handler: app
}

app.listen(3000, '0.0.0.0')

