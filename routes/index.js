const express = require('express')
const router = express.Router()

const userRouter = require('./users')
const UserService = require('../services/user_service')

/* GET home page. */


router.get('/login', (req, res, next) => {
  (async () => {
    const {username, password} = req.body
    return await UserService.loginWithNamePass(username, password)
  })()
    .then(r => {
      res.data = r
    })
    .catch(e => {
      res.err = e
    })
});
/* GET users listing. */

router.use('/user', userRouter)

module.exports = router;
