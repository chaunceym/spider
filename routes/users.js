const express = require('express');
const router = express.Router();

const UserService = require('./../services/user_service')
/* GET users listing. */
router.get('/', (req, res) => {
  (async ()=>{
    const users = await UserService.getAllUsers()
    console.log(users)
    res.locals.user = users
    res.render('users')
  })()
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
});

router.post('/', (req, res) => {
  (async ()=>{
    const {name,age} = req.body
    const newUser = await UserService.addNewUser(name, age)
    res.json(newUser)
  })()
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
});

router.get('/:userId', (req, res) => {
  (async ()=>{
    const user = await UserService.getUserById(req.params.userId)
    res.locals.user = user
    res.render('user')
  })()
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
});

router.post('/:userId/subscription', (req, res, next) => {
  (async ()=>{
    const sub = await UserService.createSubscription(Number(req.params.userId), req.body.url)
    res.json(sub)
  })()
    .then(r=>{
      console.log(r)
    })
    .catch(e=>{
      console.log(e)
    })
});
module.exports = router;
