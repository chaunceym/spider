const express = require('express');
const router = express.Router();

const UserService = require('./../services/user_service')
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.locals.user = UserService.getAllUsers()
  res.render('user')
});

router.post('/', (req, res) => {
  console.log(req)
  const {firstName, lastName, age} = req.body
  const newUser = UserService.insert(firstName, lastName, age)
  res.json(newUser)
});

module.exports = router;
