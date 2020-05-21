const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const users = []
/* GET home page. */

router.get('/login', (req, res, next) => {
  const {username} = req.query
  req.session.user = {username}
  res.send('done')
})

router.get('/hello', (req, res, next) => {
  console.log(req.session)
  const {username} = req.session.user
  res.send(`<h1>hello: ${username}</h1>`)
})

router.use('/user', userRouter)

module.exports = router;
