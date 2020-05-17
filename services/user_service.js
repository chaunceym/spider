const User = require('./../models/in_memo/user')

module.exports.getAllUsers = () => {
  return User.list()
}

module.exports.insert = (firstName,lastName,age) => {
  console.log(firstName,lastName,age)
  return User.insert(firstName,lastName,age)
}
