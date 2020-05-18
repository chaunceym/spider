const express = require('express');
const router = express.Router();

const UserService = require('./../services/user_service')
/* GET users listing. */
router.get('/', (req, res, next) => {
  (async ()=>{
    res.locals.user = UserService.getAllUsers()
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
  const {firstName, lastName, age} = req.body
  const newUser = UserService.addNewUser(firstName, lastName, age)
  res.json(newUser)
});

router.get('/:userId', (req, res) => {
  const user = UserService.getUserById(Number(req.params.userId))
  res.locals.user = user
  console.log(user)
  res.render('user')
});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubscription(Number(req.params.userId), req.body.url)
    res.json(sub)
  } catch (e) {
    next(e)

  }
});
module.exports = router;
