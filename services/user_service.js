const User = require('./../models/mongoose/user')
const Subscription = require('./../models/in_memo/subscription')

module.exports.getAllUsers = async () => {
  console.log('list')
  console.log(User.list())
  return await User.list()
}

module.exports.addNewUser = async (name, age) => {
  return await User.insert({name, age})
}

module.exports.getUserById = async (userId) => {
  return await User.getOneById(userId)
}

module.exports.createSubscription = async (userId, url) => {
  const user = await User.getOneById(userId)
  if (!user) throw Error('the user is not exist')
  return Subscription.insert(userId, url)
}



