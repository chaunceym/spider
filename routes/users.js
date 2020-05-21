const express = require('express');
const router = express.Router();
const HTTPRequestParamError = require('./../errors/http_request_param_error')
const UserService = require('./../services/user_service')
/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers()
    console.log(users)
    res.locals.user = users
  })()
    .then(() => {
      res.render('users')
    })
    .catch(e => {
      next(e)
    })
});

router.post('/', (req, res) => {
  (async () => {
    const {name, age} = req.body
    const newUser = await UserService.addNewUser(name, age)
    res.json(newUser)
  })()
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      console.log(e)
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

router.post('/:userId/subscription', (req, res, next) => {
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
