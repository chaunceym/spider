const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')

const userRouter = require('./users')
/* GET home page. */

router.get('/login', (req, res, next) => {
  const {username} = req.query
  const user = {username, expireAt: Date.now().valueOf() + (20 * 60 * 1000)}
  const token = JWT.sign(user, 'asdffniangsddngo')
  res.send(token)
})

router.get('/hello', (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) return res.send('no auth')
  if (!auth.indexOf('Bearer ') === -1) res.send('no auth')
  const token = auth.split('Bearer ')[1]
  const user = JWT.verify(token, 'asdffniangsddngo')
  if (user.expireAt < Date.now().valueOf()) res.send('no auth')
  res.send(user)
})


router.use('/user', userRouter)

module.exports = router;
