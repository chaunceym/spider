const HttpBaseError = require('./http_base_error')
const ERROR_CODE = 40000001

class NoAuthError extends HttpBaseError {
  constructor(token) {
    super(401, '没有访问权限', ERROR_CODE, `no auth token ${token}`);
  }
}

module.exports = NoAuthError