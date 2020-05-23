const express = require('express');
const router = express.Router();
const HTTPRequestParamError = require('./../errors/http_request_param_error')
const UserService = require('./../services/user_service')
const auth = require('./../middlewares/auth')

router.post('/', (req, res) => {
  (async () => {
    const {username, password, name} = req.body
    const result = await UserService.addNewUser({
      username,
      password,
      name
    })
    return result
  })()
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      next(e)
    })
});

router.get('/', (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers()
    return {
      users
    }
  })()
    .then(r => {
      res.data = r
    })
    .catch(e => {
      next(e)
    })
});
router.get('/:userId', (req, res) => {
  (async () => {
    const {userId} = req.params
    if (userId.length < 5) {
      throw new HTTPRequestParamError(
        'userId', '用户 id 不能为空',
        'user id can not be empty'
      )
    }
    const user = await UserService.getUserById(userId)
    res.locals.user = user
    res.render('user')
  })()
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      console.log(e)
      res.json(e)
    })
});

router.post('/:userId/subscription', auth(), (req, res, next) => {
  (async () => {
    const sub = await UserService.createSubscription(Number(req.params.userId), req.body.url)
    res.json(sub)
  })()
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      console.log(e)
    })
});
module.exports = router;
