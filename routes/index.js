const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')

const userRouter = require('./users')

const User = require('./../models/mongoose/user')
const crypto = require('crypto')
const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2)
/* GET home page. */

router.post('/login', (req, res, next) => {
  (async () => {
    const {username, password} = req.body
    const cipher = await crypto.pbkdf2Async(password, 'adfjikjionmaeawqgg', 10000, 512, 'sha256')
      .then()
    const created = await User.insert({username, cipher})
  })()
    .then(r => {

    })
    .catch(e => {

    })
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
