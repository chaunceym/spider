const JWT = require('jsonwebtoken')
const JWT_CONFIG = require('./../cipher/jwt_config')
const NoAuthError = require('./../errors/no_auth_error')
module.exports = (options) => {
  return (req, res, next) => {
    (async () => {
      const authorization = req.get('Authorization')
      if (!authorization || authorization.indexOf('Bearer') === -1) throw new NoAuthError(null)
      const token = authorization.split(' ')[1]
      if (!token) throw new NoAuthError(null)
      let user
      try {
        user = JWT.verify(token, JWT_CONFIG.SECRET)
      } catch (e) {
        throw new NoAuthError(token)
      }
      req.user = user
    })()
      .then(r => {
        next()
      })
      .catch(e => {
        next(e)
      })
  }
}
