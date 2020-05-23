const User = require('./../models/mongoose/user')
const Subscription = require('./../models/in_memo/subscription')
const HttpRequestParamError = require('./../errors/http_request_param_error')
const NoSuchUserError = require('./../errors/no_such_user_error')
const JWT = require('jsonwebtoken')
const JWT_CONFIG = require('./../cipher/jwt_config')
module.exports.getAllUsers = async () => {
  return await User.list()
}

module.exports.addNewUser = async (user) => {
  if (!user || !user.username || !user.password || !user.name) throw  new HttpRequestParamError('user', '用户名或密码为空', 'empty username or password')
  const created =  await User.createUserByNamePass(user)
  const token = JWT.sign({
    _id: created._id.toString(),
    expireAt: Date.now().valueOf() + JWT_CONFIG.expireIn
  }, JWT_CONFIG.SECRET)
  return {
    user: created,
    token
  }
}
module.exports.loginWithNamePass = async (username, password) => {
  if (!username || !password) throw  new HttpRequestParamError('user', '用户名或密码为空', 'empty username or password')
  const found = User.getUserByNamePass(username, password)
  if (!found) throw new NoSuchUserError(null, username)
  const token = JWT.sign({
    _id: found._id.toString(),
    expireAt: Date.now().valueOf() + JWT_CONFIG.expireIn
  }, JWT_CONFIG.SECRET)
  return {
    token,
    user: found
  }
}

module.exports.getUserById = async (userId) => {
  return await User.getOneById(userId)
}

module.exports.createSubscription = async (userId, url) => {
  const user = await User.getOneById(userId)
  if (!user) throw Error('the user is not exist')
  return Subscription.insert(userId, url)
}



