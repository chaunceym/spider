const HTTPBaseError = require('./http_base_error')

const ERROR_CODE = 4000000

class HTTPRequestParamError extends HTTPBaseError{
  constructor(name, description, msg) {
    super(200,description,ERROR_CODE,`${name} wrong: ${msg}`)
  }
}

module.exports = HTTPRequestParamError